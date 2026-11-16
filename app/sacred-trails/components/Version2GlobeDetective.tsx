import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  MapPin,
  HelpCircle,
  BookOpen,
  Award,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  ChevronRight,
  Search,
  Globe,
  Flame,
  Layers,
  Map as MapIcon,
  Volume2,
  Square,
  Lock,
} from 'lucide-react';
import { SAINT_TRAILS, SaintTrailProfile, TrailStop } from '../data/saintsTrails';
import { soundEngine } from '../utils/soundEngine';
import { ResilientImage } from './ResilientImage';

interface Version2GlobeDetectiveProps {
  saintTrail?: SaintTrailProfile;
  onSolvedCountChange?: (solvedCount: number) => void;
}

export type GlobeMapStyle = 'satellite_hd' | 'natgeo_atlas' | 'golden_twilight';

const GLOBE_RADIUS = 10;

/**
 * Converts geographic (latDeg, lngDeg) to 3D Cartesian coordinates aligned
 * with standard equirectangular Earth textures on THREE.SphereGeometry.
 */
function latLngToVector3(
  latDeg: number,
  lngDeg: number,
  radius: number,
  out = new THREE.Vector3()
): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - latDeg);
  const theta = THREE.MathUtils.degToRad(lngDeg + 180);
  out.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
  return out;
}

interface GeoJsonFeature {
  type: string;
  properties: { name?: string; iso?: string; hd?: boolean };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export const Version2GlobeDetective: React.FC<Version2GlobeDetectiveProps> = ({
  saintTrail = SAINT_TRAILS[0],
  onSolvedCountChange,
}) => {
  const trailStops = saintTrail.stops;
  const mountRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const leaderLineRefs = useRef<Record<number, SVGLineElement | null>>({});
  const anchorDotRefs = useRef<Record<number, SVGCircleElement | null>>({});

  // Game progression state
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [solvedStopNumbers, setSolvedStopNumbers] = useState<number[]>([]);
  const [zoomedStopNumber, setZoomedStopNumber] = useState<number | null>(null);
  const [showGlobeLabels, setShowGlobeLabels] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<GlobeMapStyle>('satellite_hd');
  const [revealedClueIds, setRevealedClueIds] = useState<string[]>([
    trailStops[0].detectiveClues[0].id,
  ]);
  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'info' | 'success' | 'mismatch';
    text: string;
  }>({
    type: 'info',
    text: `Read the Detective Clues on the right, then click any of the 6 Sanctuary Beacons on the Ultra-HD 3D Earth to trace ${saintTrail.saintName}’s footsteps!`,
  });

  // Inspection Modal when a stop is solved or inspected
  const [inspectedStop, setInspectedStop] = useState<TrailStop | null>(null);
  const [cinematicFlightStop, setCinematicFlightStop] = useState<TrailStop | null>(null);
  const [flightStageText, setFlightStageText] = useState<string>('');
  const [cinematicPortalGlow, setCinematicPortalGlow] = useState<boolean>(false);
  const flightTimerRef = useRef<number | null>(null);
  const stageTimerRef = useRef<number | null>(null);
  const portalTimerRef = useRef<number | null>(null);
  const [activePhotoHotspotId, setActivePhotoHotspotId] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  const currentCaseStop = trailStops[activeCaseIndex] || trailStops[0];

  const clearFlightTimers = useCallback(() => {
    if (flightTimerRef.current !== null) {
      window.clearTimeout(flightTimerRef.current);
      flightTimerRef.current = null;
    }
    if (stageTimerRef.current !== null) {
      window.clearTimeout(stageTimerRef.current);
      stageTimerRef.current = null;
    }
    if (portalTimerRef.current !== null) {
      window.clearTimeout(portalTimerRef.current);
      portalTimerRef.current = null;
    }
  }, []);

  // Clear any active cinematic flight timer on unmount
  useEffect(() => {
    return () => {
      clearFlightTimers();
    };
  }, [clearFlightTimers]);

  const initialOverviewCamPos = latLngToVector3(
    saintTrail.overviewCamera.camLat,
    saintTrail.overviewCamera.camLng,
    GLOBE_RADIUS + saintTrail.overviewCamera.camAltitude
  );
  const initialOverviewLookAt = latLngToVector3(
    saintTrail.overviewCamera.lookLat,
    saintTrail.overviewCamera.lookLng,
    GLOBE_RADIUS * saintTrail.overviewCamera.lookRadiusScale
  );

  const liveCameraPosRef = useRef<THREE.Vector3>(initialOverviewCamPos.clone());
  const liveLookAtRef = useRef<THREE.Vector3>(initialOverviewLookAt.clone());

  // Deterministic time-based spherical keyframe flight state
  const cameraTargetDataRef = useRef<{
    autoMove: boolean;
    startTimeMs: number;
    durationMs: number;
    startCameraPos: THREE.Vector3;
    desiredCameraPos: THREE.Vector3;
    startLookAt: THREE.Vector3;
    desiredLookAt: THREE.Vector3;
    arcLift: number;
  }>({
    autoMove: false,
    startTimeMs: 0,
    durationMs: 1200,
    startCameraPos: initialOverviewCamPos.clone(),
    desiredCameraPos: initialOverviewCamPos.clone(),
    startLookAt: initialOverviewLookAt.clone(),
    desiredLookAt: initialOverviewLookAt.clone(),
    arcLift: 0,
  });

  const startSmoothCameraFlight = useCallback(
    (
      desiredCameraPos: THREE.Vector3,
      desiredLookAt: THREE.Vector3,
      durationMs = 1350,
      arcLift = 0.85,
      overrideStartCamPos?: THREE.Vector3,
      overrideStartLookAt?: THREE.Vector3
    ) => {
      const fromCam = overrideStartCamPos ? overrideStartCamPos.clone() : liveCameraPosRef.current.clone();
      const fromLook = overrideStartLookAt ? overrideStartLookAt.clone() : liveLookAtRef.current.clone();
      liveCameraPosRef.current.copy(fromCam);
      liveLookAtRef.current.copy(fromLook);
      cameraTargetDataRef.current = {
        autoMove: true,
        startTimeMs: performance.now(),
        durationMs,
        startCameraPos: fromCam,
        desiredCameraPos: desiredCameraPos.clone(),
        startLookAt: fromLook,
        desiredLookAt: desiredLookAt.clone(),
        arcLift,
      };
    },
    []
  );

  // Reset state cleanly when switching between Saint Trails
  useEffect(() => {
    clearFlightTimers();
    soundEngine.stopSpeaking();
    setIsNarrating(false);
    setActiveCaseIndex(0);
    setSolvedStopNumbers([]);
    setZoomedStopNumber(null);
    setCinematicFlightStop(null);
    setFlightStageText('');
    setCinematicPortalGlow(false);
    setInspectedStop(null);
    setShowCompletionModal(false);
    setRevealedClueIds([saintTrail.stops[0].detectiveClues[0].id]);
    setFeedbackBanner({
      type: 'info',
      text: `Read the Detective Clues on the right, then click any of the 6 Sanctuary Beacons on the Ultra-HD 3D Earth to trace ${saintTrail.saintName}’s footsteps!`,
    });
    const ov = saintTrail.overviewCamera;
    startSmoothCameraFlight(
      latLngToVector3(ov.camLat, ov.camLng, GLOBE_RADIUS + ov.camAltitude),
      latLngToVector3(ov.lookLat, ov.lookLng, GLOBE_RADIUS * ov.lookRadiusScale),
      1400,
      1.2
    );
  }, [saintTrail, clearFlightTimers, startSmoothCameraFlight]);

  useEffect(() => {
    onSolvedCountChange?.(solvedStopNumbers.length);
  }, [solvedStopNumbers.length, onSolvedCountChange]);

  useEffect(() => {
    const firstClueId = currentCaseStop.detectiveClues[0].id;
    setRevealedClueIds((prev) => (prev.includes(firstClueId) ? prev : [...prev, firstClueId]));
  }, [currentCaseStop]);

  const solvedStopNumbersRef = useRef<number[]>(solvedStopNumbers);
  useEffect(() => {
    solvedStopNumbersRef.current = solvedStopNumbers;
  }, [solvedStopNumbers]);

  const zoomedStopNumberRef = useRef<number | null>(zoomedStopNumber);
  useEffect(() => {
    zoomedStopNumberRef.current = zoomedStopNumber;
  }, [zoomedStopNumber]);

  const showGlobeLabelsRef = useRef<boolean>(showGlobeLabels);
  useEffect(() => {
    showGlobeLabelsRef.current = showGlobeLabels;
  }, [showGlobeLabels]);

  const mapStyleRef = useRef<GlobeMapStyle>(mapStyle);
  const earthShaderUniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  const borderGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    mapStyleRef.current = mapStyle;
    if (earthShaderUniformsRef.current) {
      earthShaderUniformsRef.current.uStyleMode.value =
        mapStyle === 'satellite_hd' ? 0.0 : mapStyle === 'natgeo_atlas' ? 1.0 : 2.0;
    }
    if (borderGroupRef.current) {
      // In NatGeo Atlas mode, borders are already printed on the map; keep 3D vector borders subtle
      borderGroupRef.current.visible = mapStyle !== 'natgeo_atlas';
    }
  }, [mapStyle]);

  const zoomToStopOnGlobe = useCallback(
    (stopNumber: number) => {
      clearFlightTimers();
      setCinematicFlightStop(null);
      setFlightStageText('');
      setCinematicPortalGlow(false);
      soundEngine.playEffect('compass_click');
      soundEngine.playCityBiomeAudio(stopNumber);
      const stopObj = trailStops.find((s) => s.stopNumber === stopNumber);
      const lat = stopObj ? stopObj.globePlacement.latDeg : 40.5;
      const lng = stopObj ? stopObj.globePlacement.lngDeg : 9.5;
      const surfacePos = latLngToVector3(lat, lng, GLOBE_RADIUS);
      // Position camera slightly south and above the city for a dramatic 3D oblique satellite angle
      const camPos = latLngToVector3(lat - 1.9, lng - 0.4, GLOBE_RADIUS + 2.45);

      startSmoothCameraFlight(camPos, surfacePos, 1500, 1.8);
      setZoomedStopNumber(stopNumber);
    },
    [trailStops, clearFlightTimers, startSmoothCameraFlight]
  );

  const resetRegionalOverview = useCallback(() => {
    clearFlightTimers();
    setCinematicFlightStop(null);
    setFlightStageText('');
    setCinematicPortalGlow(false);
    soundEngine.playEffect('vellum_page');
    const ov = saintTrail.overviewCamera;
    startSmoothCameraFlight(
      latLngToVector3(ov.camLat, ov.camLng, GLOBE_RADIUS + ov.camAltitude),
      latLngToVector3(ov.lookLat, ov.lookLng, GLOBE_RADIUS * ov.lookRadiusScale),
      1400,
      1.0
    );
    setZoomedStopNumber(null);
  }, [saintTrail, clearFlightTimers, startSmoothCameraFlight]);

  const resetFullPlanetOverview = useCallback(() => {
    clearFlightTimers();
    setCinematicFlightStop(null);
    setFlightStageText('');
    setCinematicPortalGlow(false);
    soundEngine.playEffect('vellum_page');
    const ov = saintTrail.overviewCamera;
    startSmoothCameraFlight(
      latLngToVector3(24.0, ov.camLng, GLOBE_RADIUS + 14.5),
      new THREE.Vector3(0, 0, 0),
      1450,
      0.5
    );
    setZoomedStopNumber(null);
  }, [saintTrail, clearFlightTimers, startSmoothCameraFlight]);

  // Initialize Ultra-HD Multi-Resolution Three.js Earth Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#02050b');

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 300);
    camera.position.copy(cameraTargetDataRef.current.desiredCameraPos);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const gl = renderer.getContext();
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|Software|Microsoft Basic Render/i.test(gpu);

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Subtle PBR environment for metallic 3D beacons & trail arcs
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envMap;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // OrbitControls — minDistance is distance from controls.target (the city pin), NOT from (0,0,0)!
    // Setting minDistance = 0.35 allows the camera to dive right down to street/beacon level (+0.36)!
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.35;
    controls.maxDistance = 32;
    controls.enablePan = false;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.85;
    controls.target.copy(cameraTargetDataRef.current.desiredLookAt);
    controls.update();

    let userDragging = false;
    const onControlStart = () => {
      userDragging = true;
      cameraTargetDataRef.current.autoMove = false;
    };
    const onControlEnd = () => {
      userDragging = false;
    };
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('end', onControlEnd);

    // Lighting for 3D Beacons and Golden Trail Arcs
    const ambientLight = new THREE.AmbientLight('#e2edff', 1.2);
    scene.add(ambientLight);

    const sunPos = latLngToVector3(34, -14, 48);
    const sunLight = new THREE.DirectionalLight('#fff5e0', 2.6);
    sunLight.position.copy(sunPos);
    scene.add(sunLight);

    // 1. Deep-Space 3D Starfield
    const starCount = isSoftwareGl ? 700 : 2000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 75 + Math.random() * 70;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.7) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.92;
        starColors[i * 3 + 2] = 0.78;
      } else if (tint > 0.35) {
        starColors[i * 3] = 0.8;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 0.95;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 0.95;
      }
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.26,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 2. Ultra-HD Multi-Resolution Custom Shader Earth Sphere
    // Seamlessly blends 4K Global Textures with 30K-equivalent Ultra-HD Mediterranean Regional Textures!
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const texLoader = new THREE.TextureLoader();

    const loadCrispTex = (url: string, isSrgb = true) => {
      const t = texLoader.load(url);
      if (isSrgb) t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      return t;
    };

    const worldSat4k = loadCrispTex('/textures/earth_world_4k.jpg', true);
    const medSatHd = loadCrispTex('/textures/med_satellite_hd.jpg', true);
    const worldNatGeo4k = loadCrispTex('/textures/earth_natgeo_4k.jpg', true);
    const medNatGeoHd = loadCrispTex('/textures/med_natgeo_hd.jpg', true);
    const polarCapMap = loadCrispTex('/textures/earth_atmos_2048.jpg', true);
    const normalMap = loadCrispTex('/textures/earth_normal_2048.jpg', false);
    const specMap = loadCrispTex('/textures/earth_specular_2048.jpg', false);
    const lightsMap = loadCrispTex('/textures/earth_lights_2048.png', true);

    const earthUniforms: Record<string, THREE.IUniform> = {
      uWorldSat: { value: worldSat4k },
      uMedSatHd: { value: medSatHd },
      uWorldNatGeo: { value: worldNatGeo4k },
      uMedNatGeoHd: { value: medNatGeoHd },
      uPolarCap: { value: polarCapMap },
      uNormalMap: { value: normalMap },
      uSpecMap: { value: specMap },
      uLightsMap: { value: lightsMap },
      uSunDir: { value: sunPos.clone().normalize() },
      uStyleMode: {
        value:
          mapStyleRef.current === 'satellite_hd'
            ? 0.0
            : mapStyleRef.current === 'natgeo_atlas'
              ? 1.0
              : 2.0,
      },
    };
    earthShaderUniformsRef.current = earthUniforms;

    const globeGeo = new THREE.SphereGeometry(
      GLOBE_RADIUS,
      isSoftwareGl ? 72 : 160,
      isSoftwareGl ? 72 : 160
    );

    const globeMat = new THREE.ShaderMaterial({
      uniforms: earthUniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalW;
        varying vec3 vPositionW;
        varying vec3 vTangentW;
        varying vec3 vBitangentW;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vPositionW = worldPos.xyz;
          vNormalW = normalize(mat3(modelMatrix) * normal);

          // Compute spherical tangent & bitangent for bump/normal relief
          vec3 up = vec3(0.0, 1.0, 0.0);
          vec3 tang = normalize(cross(up, vNormalW));
          if (length(tang) < 0.01) tang = vec3(1.0, 0.0, 0.0);
          vTangentW = tang;
          vBitangentW = normalize(cross(vNormalW, vTangentW));

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uWorldSat;
        uniform sampler2D uMedSatHd;
        uniform sampler2D uWorldNatGeo;
        uniform sampler2D uMedNatGeoHd;
        uniform sampler2D uPolarCap;
        uniform sampler2D uNormalMap;
        uniform sampler2D uSpecMap;
        uniform sampler2D uLightsMap;
        uniform vec3 uSunDir;
        uniform float uStyleMode;

        varying vec2 vUv;
        varying vec3 vNormalW;
        varying vec3 vPositionW;
        varying vec3 vTangentW;
        varying vec3 vBitangentW;

        void main() {
          // Convert standard equirectangular sphere UV to degrees:
          // lng in [-180, 180], lat in [-90, 90]
          float lng = vUv.x * 360.0 - 180.0;
          float lat = vUv.y * 180.0 - 90.0;

          // Ultra-HD Mediterranean regional inset covers:
          // lng: [-8.0, 28.0], lat: [26.0, 50.0]
          vec2 medUv = vec2(
            (lng - (-8.0)) / 36.0,
            (lat - 26.0) / 24.0
          );

          // Smooth feathered blend inside Mediterranean bounding box
          float inMedX = smoothstep(0.0, 0.07, medUv.x) * (1.0 - smoothstep(0.93, 1.0, medUv.x));
          float inMedY = smoothstep(0.0, 0.07, medUv.y) * (1.0 - smoothstep(0.93, 1.0, medUv.y));
          float medBlend = inMedX * inMedY;
          vec2 clampedMedUv = clamp(medUv, 0.0, 1.0);

          // Sample 4K Global + 30K-equivalent Ultra-HD Mediterranean Satellite
          vec3 globalSat = texture2D(uWorldSat, vUv).rgb;
          vec3 polarCol = texture2D(uPolarCap, vUv).rgb;
          float polarFactor = smoothstep(81.0, 84.8, abs(lat));
          globalSat = mix(globalSat, polarCol, polarFactor);
          vec3 medSat = texture2D(uMedSatHd, clampedMedUv).rgb;
          vec3 satColor = mix(globalSat, medSat, medBlend);

          // Sample 4K Global + Ultra-HD Mediterranean NatGeo Illustrated Atlas
          vec3 globalNatGeo = texture2D(uWorldNatGeo, vUv).rgb;
          globalNatGeo = mix(globalNatGeo, polarCol, polarFactor);
          vec3 medNatGeo = texture2D(uMedNatGeoHd, clampedMedUv).rgb;
          vec3 natGeoColor = mix(globalNatGeo, medNatGeo, medBlend);

          // Surface Normal perturbation for 3D mountain relief (Alps, Apennines, Atlas)
          vec3 mapN = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
          mapN.xy *= 1.85;
          vec3 N = normalize(vNormalW + mapN.x * vTangentW + mapN.y * vBitangentW);
          vec3 V = normalize(cameraPosition - vPositionW);
          vec3 L = normalize(uSunDir);

          // Water mask (1.0 = sea/ocean, 0.0 = land)
          float waterMask = texture2D(uSpecMap, vUv).r;
          vec3 cityLights = texture2D(uLightsMap, vUv).rgb;

          // Diffuse & Specular lighting
          float ndl = max(0.0, dot(N, L));
          float hemi = 0.38 + 0.62 * ndl;

          vec3 H = normalize(L + V);
          float specBase = pow(max(0.0, dot(N, H)), 42.0);
          vec3 oceanSpec = vec3(0.95, 0.88, 0.72) * specBase * waterMask * 0.42;

          // Atmospheric horizon limb scatter on the planet surface
          float rim = pow(1.0 - max(0.0, dot(vNormalW, V)), 3.2);
          vec3 atmosphereScatter = mix(vec3(0.22, 0.55, 0.98), vec3(0.95, 0.78, 0.42), 0.3) * rim * 0.48;

          vec3 finalColor;

          if (uStyleMode < 0.5) {
            // MODE 0: Ultra-HD Satellite & Ocean Bathymetry
            // Enhance contrast and richness of Mediterranean bathymetry & terrain
            vec3 enrichedSat = pow(satColor, vec3(0.96)) * 1.08;
            finalColor = enrichedSat * (0.45 + 0.68 * ndl) + oceanSpec + cityLights * vec3(1.0, 0.78, 0.4) * 0.22 + atmosphereScatter;
          } else if (uStyleMode < 1.5) {
            // MODE 1: National Geographic Illustrated Shaded Relief Atlas
            finalColor = natGeoColor * (0.68 + 0.38 * ndl) + oceanSpec * 0.35 + atmosphereScatter * 0.55;
          } else {
            // MODE 2: Sacred Golden Twilight & Illuminated Cities
            vec3 duskBase = satColor * vec3(0.32, 0.42, 0.62) * (0.35 + 0.55 * hemi);
            vec3 goldenCities = pow(cityLights, vec3(1.1)) * vec3(1.0, 0.76, 0.32) * 1.65;
            finalColor = duskBase + goldenCities + oceanSpec * 0.8 + atmosphereScatter * 0.85;
          }

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // 3. Real Drifting Atmospheric Cloud Layer (Fades automatically when zooming into the Mediterranean!)
    const cloudsMap = loadCrispTex('/textures/earth_clouds_1024.png', true);
    const cloudsGeo = new THREE.SphereGeometry(
      GLOBE_RADIUS * 1.006,
      isSoftwareGl ? 48 : 80,
      isSoftwareGl ? 48 : 80
    );
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      alphaMap: cloudsMap,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      roughness: 1.0,
      metalness: 0.0,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    scene.add(cloudsMesh);

    // 4. Rayleigh Scattering Outer Atmospheric Fresnel Halo
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.06, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionW;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vPositionW = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPositionW;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vPositionW);
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, -viewDir)), 2.8);
          vec3 skyBlue = vec3(0.26, 0.62, 1.0);
          vec3 horizonGold = vec3(0.96, 0.80, 0.45);
          vec3 col = mix(skyBlue, horizonGold, 0.25);
          gl_FragColor = vec4(col, fresnel * 0.52);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // 5. High-Definition 3D Vector Coastlines & Country Borders (/textures/world_med_hd.json)
    const borderGroup = new THREE.Group();
    borderGroupRef.current = borderGroup;
    scene.add(borderGroup);

    fetch('/textures/world_med_hd.json')
      .then((res) => res.json())
      .then((geojson: { features: GeoJsonFeature[] }) => {
        if (disposed || !geojson?.features) return;

        const highlightedPositions: number[] = [];
        const worldPositions: number[] = [];
        const pA = new THREE.Vector3();
        const pB = new THREE.Vector3();

        const pilgrimageIso = new Set(saintTrail.highlightedIsoCountries);

        const addRingSegments = (ring: number[][], targetArray: number[], radius: number) => {
          for (let i = 0; i < ring.length - 1; i++) {
            const [lng1, lat1] = ring[i];
            const [lng2, lat2] = ring[i + 1];
            if (Math.abs(lng1 - lng2) > 90) continue;
            latLngToVector3(lat1, lng1, radius, pA);
            latLngToVector3(lat2, lng2, radius, pB);
            targetArray.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
          }
        };

        geojson.features.forEach((feat) => {
          const isPilgrimageCountry = pilgrimageIso.has(feat.properties?.iso || '');
          const target = isPilgrimageCountry ? highlightedPositions : worldPositions;
          const r = isPilgrimageCountry ? GLOBE_RADIUS * 1.0014 : GLOBE_RADIUS * 1.0009;

          if (feat.geometry.type === 'Polygon') {
            const rings = feat.geometry.coordinates as number[][][];
            rings.forEach((ring) => addRingSegments(ring, target, r));
          } else if (feat.geometry.type === 'MultiPolygon') {
            const polys = feat.geometry.coordinates as number[][][][];
            polys.forEach((poly) => poly.forEach((ring) => addRingSegments(ring, target, r)));
          }
        });

        if (worldPositions.length > 0) {
          const worldGeo = new THREE.BufferGeometry();
          worldGeo.setAttribute('position', new THREE.Float32BufferAttribute(worldPositions, 3));
          const worldMat = new THREE.LineBasicMaterial({
            color: '#cbd5e1',
            transparent: true,
            opacity: 0.16,
          });
          borderGroup.add(new THREE.LineSegments(worldGeo, worldMat));
        }

        if (highlightedPositions.length > 0) {
          const hiGeo = new THREE.BufferGeometry();
          hiGeo.setAttribute('position', new THREE.Float32BufferAttribute(highlightedPositions, 3));
          const hiMat = new THREE.LineBasicMaterial({
            color: '#fde047',
            transparent: true,
            opacity: 0.42,
          });
          borderGroup.add(new THREE.LineSegments(hiGeo, hiMat));
        }
      })
      .catch(() => {});

    // 6. Sleek, Precision 3D Sanctuary Beacons (Auto-scaling with camera zoom!)
    const beaconGroups: Map<number, THREE.Group> = new Map();
    const beaconRings: Map<number, THREE.Mesh> = new Map();
    const beaconJewels: Map<number, THREE.Mesh> = new Map();
    const pickableProxies: THREE.Object3D[] = [];

    const upVec = new THREE.Vector3(0, 1, 0);
    const normalVec = new THREE.Vector3();

    trailStops.forEach((stop) => {
      const pos = latLngToVector3(
        stop.globePlacement.latDeg,
        stop.globePlacement.lngDeg,
        GLOBE_RADIUS
      );
      normalVec.copy(pos).normalize();

      const group = new THREE.Group();
      group.position.copy(pos);
      group.quaternion.setFromUnitVectors(upVec, normalVec);

      // Part A: Fine Glowing Surface Disc at Exact City Location
      const discGeo = new THREE.CylinderGeometry(0.055, 0.07, 0.018, 24);
      const discMat = new THREE.MeshStandardMaterial({
        color: stop.globePlacement.beaconColorHex,
        emissive: stop.globePlacement.beaconColorHex,
        emissiveIntensity: 0.95,
        metalness: 0.5,
        roughness: 0.2,
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.position.y = 0.01;
      group.add(disc);

      // Part B: Delicate Surface Halo Ring
      const ringGeo = new THREE.RingGeometry(0.085, 0.125, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: '#fef08a',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.015;
      group.add(ring);
      beaconRings.set(stop.stopNumber, ring);

      // Part C: Slender Golden Light Needle & Floating Octahedron Jewel
      const stemGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.24, 8);
      const stemMat = new THREE.MeshBasicMaterial({
        color: '#fef08a',
        transparent: true,
        opacity: 0.78,
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.13;
      group.add(stem);

      const jewelGeo = new THREE.OctahedronGeometry(0.055, 0);
      const jewelMat = new THREE.MeshStandardMaterial({
        color: stop.globePlacement.beaconColorHex,
        emissive: stop.globePlacement.beaconColorHex,
        emissiveIntensity: 0.9,
        metalness: 0.85,
        roughness: 0.12,
      });
      const jewel = new THREE.Mesh(jewelGeo, jewelMat);
      jewel.position.y = 0.27;
      group.add(jewel);
      beaconJewels.set(stop.stopNumber, jewel);

      // Part D: Invisible Raycast Hit Proxy on Layer 1
      const proxyGeo = new THREE.SphereGeometry(0.3, 12, 12);
      const proxyMat = new THREE.MeshBasicMaterial({ visible: false });
      const proxy = new THREE.Mesh(proxyGeo, proxyMat);
      proxy.position.y = 0.15;
      proxy.layers.set(1);
      proxy.userData = { stopNumber: stop.stopNumber };
      group.add(proxy);
      pickableProxies.push(proxy);

      scene.add(group);
      beaconGroups.set(stop.stopNumber, group);
    });

    // 7. Graceful Great-Circle Golden Pilgrimage Trail Arcs + Flowing Multi-Dot Footstep Stream!
    const trailMeshes: Map<number, THREE.Mesh> = new Map();
    const allTrailCurves: THREE.CatmullRomCurve3[] = [];

    for (let i = 0; i < trailStops.length - 1; i++) {
      const fromStop = trailStops[i];
      const toStop = trailStops[i + 1];

      const p1 = latLngToVector3(
        fromStop.globePlacement.latDeg,
        fromStop.globePlacement.lngDeg,
        GLOBE_RADIUS + 0.012
      );
      const p2 = latLngToVector3(
        toStop.globePlacement.latDeg,
        toStop.globePlacement.lngDeg,
        GLOBE_RADIUS + 0.012
      );
      const chordDist = p1.distanceTo(p2);

      const arcPoints: THREE.Vector3[] = [];
      const segments = 48;
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const interp = new THREE.Vector3().lerpVectors(p1, p2, t).normalize();
        const maxArcHeight = THREE.MathUtils.clamp(chordDist * 0.22, 0.08, 1.35);
        const elevation = Math.sin(t * Math.PI) * maxArcHeight;
        interp.multiplyScalar(GLOBE_RADIUS + 0.012 + elevation);
        arcPoints.push(interp);
      }

      const curve = new THREE.CatmullRomCurve3(arcPoints);
      allTrailCurves.push(curve);

      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.013, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: '#fde047',
        emissive: '#f59e0b',
        emissiveIntensity: 0.75,
        metalness: 0.6,
        roughness: 0.25,
        transparent: true,
        opacity: 0.85,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tubeMesh);
      trailMeshes.set(fromStop.stopNumber, tubeMesh);
    }

    // 8. Single Chronological Pilgrim Traveler Dot moving sequentially from Stop 1 (Birthplace) to Stop 6 (Final Resting Place)
    const pilgrimTravelerGroup = new THREE.Group();
    const dotCoreGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const dotCoreMat = new THREE.MeshBasicMaterial({
      color: '#ffffff',
    });
    const dotCoreMesh = new THREE.Mesh(dotCoreGeo, dotCoreMat);
    pilgrimTravelerGroup.add(dotCoreMesh);

    const dotHaloGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const dotHaloMat = new THREE.MeshBasicMaterial({
      color: '#facc15',
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    });
    const dotHaloMesh = new THREE.Mesh(dotHaloGeo, dotHaloMat);
    pilgrimTravelerGroup.add(dotHaloMesh);
    scene.add(pilgrimTravelerGroup);

    // Raycasting for clicking 3D beacons directly on the globe
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointerNdc = new THREE.Vector2();
    let downX = 0;
    let downY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(pickableProxies, false);
      if (hits.length > 0) {
        const hitStopNumber = hits[0].object.userData.stopNumber as number;
        if (hitStopNumber) {
          zoomToStopOnGlobe(hitStopNumber);
        }
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', handlePointerDown);
    domElem.addEventListener('pointerup', handlePointerUp);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Pre-allocated vectors for zero-GC animation loop
    const clock = new THREE.Clock();
    const projVec = new THREE.Vector3();
    const camToBeacon = new THREE.Vector3();
    const beaconNormal = new THREE.Vector3();
    const travelerPos = new THREE.Vector3();

    let disposed = false;
    let rafId = 0;

    function afterDraw(cb: () => void) {
      if (!isSoftwareGl) {
        rafId = requestAnimationFrame(cb);
        return;
      }
      const gl2 = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl2.fenceSync === 'function') {
        const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl2.flush();
        const poll = () => {
          if (disposed || !sync) return;
          const r = gl2.clientWaitSync(sync, 0, 0);
          if (r === gl2.TIMEOUT_EXPIRED) {
            setTimeout(poll, 4);
            return;
          }
          gl2.deleteSync(sync);
          cb();
        };
        setTimeout(poll, 4);
      } else {
        rafId = requestAnimationFrame(cb);
      }
    }

    const dirStartVec = new THREE.Vector3();
    const dirEndVec = new THREE.Vector3();

    const tick = () => {
      if (disposed) return;
      clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Deterministic time-based spherical keyframe flight (immune to feedback loops & OrbitControls damping)
      if (!userDragging && cameraTargetDataRef.current.autoMove) {
        const td = cameraTargetDataRef.current;
        const elapsedFlightMs = Math.max(0, performance.now() - td.startTimeMs);
        const rawU = Math.min(1, elapsedFlightMs / Math.max(1, td.durationMs));
        // Smooth cubic ease-in-out
        const t = rawU < 0.5 ? 4 * rawU * rawU * rawU : 1 - Math.pow(-2 * rawU + 2, 3) / 2;

        const startRadius = td.startCameraPos.length();
        const endRadius = td.desiredCameraPos.length();
        // Parabolic orbital arc lift (0 at t=0, peaks at t=0.5, 0 at t=1)
        const midArc = Math.sin(t * Math.PI) * td.arcLift;
        const nextRadius = THREE.MathUtils.lerp(startRadius, endRadius, t) + midArc;

        dirStartVec.copy(td.startCameraPos).normalize();
        dirEndVec.copy(td.desiredCameraPos).normalize();
        camera.position
          .copy(dirStartVec)
          .lerp(dirEndVec, t)
          .normalize()
          .multiplyScalar(Math.max(GLOBE_RADIUS + 0.35, nextRadius));

        controls.target.lerpVectors(td.startLookAt, td.desiredLookAt, t);
        controls.enableDamping = false;
        controls.update();

        if (rawU >= 1) {
          td.autoMove = false;
          controls.enableDamping = true;
        }
      } else {
        controls.enableDamping = true;
        controls.update();
      }

      // Safety clamp so user manual zoom never clips beneath the Earth surface
      if (camera.position.length() < GLOBE_RADIUS + 0.34) {
        camera.position.setLength(GLOBE_RADIUS + 0.34);
      }

      // Keep live camera & lookAt refs synced for the next keyframe flight
      liveCameraPosRef.current.copy(camera.position);
      liveLookAtRef.current.copy(controls.target);

      // Slowly drift atmospheric clouds and fade them out when zoomed into the Mediterranean
      cloudsMesh.rotation.y = elapsed * 0.004;
      const camAltitude = camera.position.length() - GLOBE_RADIUS;
      cloudsMat.opacity =
        mapStyleRef.current === 'natgeo_atlas'
          ? 0.0
          : THREE.MathUtils.clamp((camAltitude - 3.8) * 0.032, 0.02, 0.24);

      // Auto-scale 3D beacons & moving dots based on camera altitude so they stay razor-sharp when zoomed in
      const beaconScale = THREE.MathUtils.clamp(camAltitude * 0.135, 0.34, 1.1);

      const currentZoomed = zoomedStopNumberRef.current;
      const currentSolved = solvedStopNumbersRef.current;
      const labelsVisible = showGlobeLabelsRef.current;
      const canvasW = renderer.domElement.clientWidth;
      const canvasH = renderer.domElement.clientHeight;

      trailStops.forEach((stop) => {
        const sNum = stop.stopNumber;
        const ring = beaconRings.get(sNum);
        const jewel = beaconJewels.get(sNum);
        const group = beaconGroups.get(sNum);
        const isSelected = currentZoomed === sNum;
        const isSolved = currentSolved.includes(sNum);

        if (group) {
          const s = isSelected ? beaconScale * 1.25 : beaconScale;
          group.scale.setScalar(s);
        }

        if (ring) {
          const pulse = isSelected
            ? 1.3 + Math.sin(elapsed * 4.5) * 0.2
            : 1.0 + Math.sin(elapsed * 2.2 + sNum) * 0.1;
          ring.scale.set(pulse, pulse, 1);
        }

        if (jewel) {
          jewel.rotation.y = elapsed * 1.4 + sNum;
          const mat = jewel.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = isSelected ? 1.5 : isSolved ? 1.0 : 0.65;
        }

        // Project 2D screen coordinates + SVG leader line
        const labelEl = labelRefs.current[sNum];
        const lineEl = leaderLineRefs.current[sNum];
        const dotEl = anchorDotRefs.current[sNum];

        if (labelEl && group) {
          projVec.copy(group.position);
          beaconNormal.copy(group.position).normalize();
          camToBeacon.subVectors(camera.position, group.position).normalize();
          const dot = beaconNormal.dot(camToBeacon);

          projVec.project(camera);

          if (labelsVisible && dot > 0.15 && projVec.z < 1) {
            const anchorX = (projVec.x * 0.5 + 0.5) * canvasW;
            const anchorY = (-(projVec.y * 0.5) + 0.5) * canvasH;
            const [offX, offY] = stop.globePlacement.labelOffsetPx || [0, -24];
            const labelX = anchorX + offX;
            const labelY = anchorY + offY;

            labelEl.style.transform = `translate(-50%, -50%) translate(${labelX.toFixed(1)}px, ${labelY.toFixed(1)}px)`;
            labelEl.style.opacity = '1';
            labelEl.style.pointerEvents = 'auto';

            if (lineEl) {
              lineEl.setAttribute('x1', anchorX.toFixed(1));
              lineEl.setAttribute('y1', anchorY.toFixed(1));
              lineEl.setAttribute('x2', labelX.toFixed(1));
              lineEl.setAttribute('y2', labelY.toFixed(1));
              lineEl.style.opacity = isSelected ? '0.95' : '0.6';
            }
            if (dotEl) {
              dotEl.setAttribute('cx', anchorX.toFixed(1));
              dotEl.setAttribute('cy', anchorY.toFixed(1));
              dotEl.style.opacity = '1';
            }
          } else {
            labelEl.style.opacity = '0';
            labelEl.style.pointerEvents = 'none';
            if (lineEl) lineEl.style.opacity = '0';
            if (dotEl) dotEl.style.opacity = '0';
          }
        }
      });

      // Animate the single chronological Pilgrim Dot from Stop 1 (Birthplace) -> Stop 6 (Final Resting Place)
      if (allTrailCurves.length > 0) {
        const totalLegs = allTrailCurves.length;
        const journeyProgress = (elapsed * 0.32) % totalLegs;
        const activeLegIdx = Math.min(Math.floor(journeyProgress), totalLegs - 1);
        const legT = journeyProgress - activeLegIdx;
        const activeCurve = allTrailCurves[activeLegIdx];
        if (activeCurve) {
          activeCurve.getPointAt(legT, travelerPos);
          pilgrimTravelerGroup.position.copy(travelerPos);
          const pulse = 1.0 + Math.sin(elapsed * 5.0) * 0.14;
          pilgrimTravelerGroup.scale.setScalar(beaconScale * pulse);
        }
      }

      // Highlight solved trail arcs
      trailMeshes.forEach((mesh, stopNum) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (currentSolved.includes(stopNum)) {
          mat.emissiveIntensity = 1.25;
          mat.opacity = 0.96;
        } else {
          mat.emissiveIntensity = 0.55;
          mat.opacity = 0.65;
        }
      });

      renderer.render(scene, camera);
      afterDraw(tick);
    };

    afterDraw(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      domElem.removeEventListener('pointerdown', handlePointerDown);
      domElem.removeEventListener('pointerup', handlePointerUp);
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      controls.dispose();
      worldSat4k.dispose();
      medSatHd.dispose();
      worldNatGeo4k.dispose();
      medNatGeoHd.dispose();
      polarCapMap.dispose();
      normalMap.dispose();
      specMap.dispose();
      lightsMap.dispose();
      cloudsMap.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      dotCoreGeo.dispose();
      dotCoreMat.dispose();
      dotHaloGeo.dispose();
      dotHaloMat.dispose();
      envMap.dispose();
      renderer.dispose();
    };
  }, [zoomToStopOnGlobe, saintTrail, trailStops]);

  const handleRevealClue = (
    clueId: string,
    soundCue: 'compass_click' | 'gregorian_chime' | 'relic_discovered'
  ) => {
    soundEngine.playEffect(soundCue);
    if (!revealedClueIds.includes(clueId)) {
      setRevealedClueIds((prev) => [...prev, clueId]);
    }
  };

  /**
   * Reusable Globe-to-Scene Cinematic Flight (Option A + Option B):
   * - Stage 1 (0 -> 1.9s): Sweeps the 3D camera across the planet in a high parabolic arc (`arcLift: 2.8`)
   *   to frame the destination city from satellite orbit (`+2.45` altitude) with city callouts visible.
   * - Stage 2 (1.9s -> 3.6s): Plunges straight down from satellite orbit to street/sanctuary level
   *   (`+0.36` altitude) right into the glowing 3D golden octahedron beacon.
   * - Stage 3 (3.25s -> 3.8s): Blooms a warm Golden Sanctuary Light Portal and automatically opens the
   *   existing historical "Stop Photo & Story" scene!
   */
  const flyAndEnterHistoricalScene = useCallback(
    (targetStop: TrailStop, forceFromFullEarth = false) => {
      clearFlightTimers();
      soundEngine.playCityBiomeAudio(targetStop.stopNumber);

      const lat = targetStop.globePlacement.latDeg;
      const lng = targetStop.globePlacement.lngDeg;

      // Regional approach pose (Stage 1 orbital sweep)
      const approachSurfacePos = latLngToVector3(lat, lng, GLOBE_RADIUS);
      const approachCamPos = latLngToVector3(lat - 1.8, lng - 0.35, GLOBE_RADIUS + 2.45);

      // Ground-level Sanctuary Dive pose right into the glowing 3D Beacon (Stage 2)
      const beaconJewelPos = latLngToVector3(lat, lng, GLOBE_RADIUS + 0.14);
      const groundDiveCamPos = latLngToVector3(lat - 0.24, lng - 0.05, GLOBE_RADIUS + 0.38);

      setZoomedStopNumber(targetStop.stopNumber);
      setActivePhotoHotspotId(targetStop.hiddenArtifacts[0].id);

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        startSmoothCameraFlight(approachCamPos, approachSurfacePos, 400, 0);
        setCinematicFlightStop(null);
        setFlightStageText('');
        setCinematicPortalGlow(false);
        setInspectedStop(targetStop);
        return;
      }

      setCinematicFlightStop(targetStop);
      setCinematicPortalGlow(false);

      // If replaying or already very close to the city, start from a wide planetary orbit
      // so the player always experiences the full cross-globe flight + street-level sanctuary dive!
      const currentDistToApproach = liveCameraPosRef.current.distanceTo(approachCamPos);
      const shouldStartFromWideOrbit = forceFromFullEarth || currentDistToApproach < 1.2;

      const wideStartCamPos = shouldStartFromWideOrbit
        ? latLngToVector3(
            Math.max(-20, Math.min(52, lat + 16)),
            lng - 38,
            GLOBE_RADIUS + 13.5
          )
        : undefined;
      const wideStartLookAt = shouldStartFromWideOrbit ? new THREE.Vector3(0, 0, 0) : undefined;

      // Stage 1 (0 -> 1900ms): Grand orbital sweep across the 3D Earth to frame the city
      setFlightStageText(
        `Stage 1/2 · Sweeping Across 3D Earth to ${targetStop.modernPlaceName}, ${targetStop.modernCountry}…`
      );
      startSmoothCameraFlight(
        approachCamPos,
        approachSurfacePos,
        1850,
        2.6,
        wideStartCamPos,
        wideStartLookAt
      );

      // Stage 2 (1900ms -> 3550ms): Plunge straight down into the glowing golden 3D Sanctuary Beacon
      stageTimerRef.current = window.setTimeout(() => {
        stageTimerRef.current = null;
        soundEngine.playEffect('compass_click');
        setFlightStageText(
          `Stage 2/2 · Diving Into Ancient ${targetStop.ancientPlaceName} Sanctuary Beacon…`
        );
        startSmoothCameraFlight(groundDiveCamPos, beaconJewelPos, 1650, 0.0);
      }, 1900);

      // Stage 3 (3250ms -> 3800ms): Bloom warm golden light portal before opening the historical scene
      portalTimerRef.current = window.setTimeout(() => {
        portalTimerRef.current = null;
        soundEngine.playEffect('sanctuary_bell');
        setFlightStageText(`Entering ${targetStop.ancientPlaceName} Historical Scene…`);
        setCinematicPortalGlow(true);
      }, 3250);

      // Stage 4 (3800ms): Automatically enter the historical Stop Photo & Story scene
      flightTimerRef.current = window.setTimeout(() => {
        flightTimerRef.current = null;
        setCinematicFlightStop(null);
        setFlightStageText('');
        setCinematicPortalGlow(false);
        setInspectedStop(targetStop);
      }, 3800);
    },
    [clearFlightTimers, startSmoothCameraFlight]
  );

  const handleConfirmCityForCase = (stopToVerify: TrailStop) => {
    if (stopToVerify.stopNumber === currentCaseStop.stopNumber) {
      soundEngine.playEffect('wax_seal_stamp');
      const nextSolved = solvedStopNumbers.includes(stopToVerify.stopNumber)
        ? solvedStopNumbers
        : [...solvedStopNumbers, stopToVerify.stopNumber];
      setSolvedStopNumbers(nextSolved);

      setFeedbackBanner({
        type: 'success',
        text: `Case #${currentCaseStop.stopNumber} Solved! Diving into ${stopToVerify.modernPlaceName}, ${stopToVerify.modernCountry} (Ancient ${stopToVerify.ancientPlaceName}) to enter the historical sanctuary…`,
      });

      flyAndEnterHistoricalScene(stopToVerify);

      if (nextSolved.length === trailStops.length) {
        setTimeout(() => {
          soundEngine.playEffect('pilgrimage_complete');
        }, 450);
      }
    } else {
      // Even on a mismatch from full-globe 1-click confirm, fly the camera to that city so the player sees what they picked!
      if (zoomedStopNumber !== stopToVerify.stopNumber) {
        zoomToStopOnGlobe(stopToVerify.stopNumber);
      }
      soundEngine.playEffect('puzzle_mismatch');
      setFeedbackBanner({
        type: 'mismatch',
        text: `Not quite! That is ${stopToVerify.modernPlaceName}, ${stopToVerify.modernCountry} (Ancient ${stopToVerify.ancientPlaceName}). Re-read the Modern-Day City Clue and Fun Fact Clue for Case #${currentCaseStop.stopNumber}!`,
      });
    }
  };

  const zoomedStopObj = zoomedStopNumber
    ? trailStops.find((s) => s.stopNumber === zoomedStopNumber) || null
    : null;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8">
      {/* Top Trail Case Stepper (All 6 Cases) */}
      <div className="mb-4 rounded-2xl border border-[#2a241c] bg-[#13100d] p-3 sm:mb-5 sm:p-3.5 shadow-xl">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 shrink-0 text-[#d4af37]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#d4af37]">
              Sacred Trails · Footsteps of {saintTrail.saintName} ({trailStops.length} Trail Stops)
            </span>
          </div>
          <span className="text-xs text-[#a39783]">
            Solved Trail Cases:{' '}
            <strong className="text-[#f4efe6]">
              {solvedStopNumbers.length} / {trailStops.length}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {trailStops.map((stop, idx) => {
            const isCurrentCase = idx === activeCaseIndex;
            const isSolved = solvedStopNumbers.includes(stop.stopNumber);
            return (
              <button
                key={stop.stopNumber}
                onClick={() => {
                  soundEngine.stopSpeaking();
                  setIsNarrating(false);
                  soundEngine.playEffect('vellum_page');
                  setActiveCaseIndex(idx);
                  if (isSolved) {
                    zoomToStopOnGlobe(stop.stopNumber);
                    setFeedbackBanner({
                      type: 'success',
                      text: `Case #${stop.stopNumber} (${stop.modernPlaceName}, ${stop.modernCountry}) is unlocked! Click "View Stop Photo & Story" to revisit its historical scene.`,
                    });
                  } else {
                    setFeedbackBanner({
                      type: 'info',
                      text: `Investigating Case #${stop.stopNumber}: Read the clues and locate the matching modern-day city on the 3D Earth!`,
                    });
                  }
                }}
                className={`group flex min-h-[60px] flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                  isCurrentCase
                    ? 'border-[#d4af37] bg-[#221c14] shadow-[0_0_18px_rgba(212,175,55,0.18)]'
                    : isSolved
                      ? 'border-emerald-700/40 bg-emerald-950/15 hover:border-emerald-500/60'
                      : 'border-[#262018] bg-[#16130f] hover:border-[#3d3326]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                    Case #{stop.stopNumber}
                  </span>
                  {isSolved ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Solved
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#847866]">Mystery</span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 font-serif text-xs font-bold text-[#f4efe6]">
                  {isSolved
                    ? `${stop.modernPlaceName}, ${stop.modernCountry}`
                    : `Trail Mystery #${stop.stopNumber}`}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-[#9a8e7a]">
                  {isSolved ? `Ancient ${stop.ancientPlaceName}` : stop.eraLabel}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 12-Column Split: 7 Cols Interactive 3D Satellite Earth + 5 Cols Detective Case Dossier */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        {/* LEFT 7 COLUMNS: Interactive Ultra-HD 3D Globe Viewport */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative overflow-hidden rounded-2xl border border-[#332a1e] bg-[#02050b] shadow-2xl">
            {/* Top HUD inside Globe (Mobile-Compact & Responsive) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col gap-2 bg-gradient-to-b from-[#02050b]/95 via-[#02050b]/70 to-transparent px-3 py-2.5 sm:px-4 sm:py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37] sm:text-[10px]">
                    3D Sacred Earth · Drag to Rotate · Pinch or Click City to Zoom
                  </p>
                  <h2 className="truncate font-serif text-sm font-bold text-[#f4efe6] sm:text-lg">
                    {zoomedStopObj
                      ? `${zoomedStopObj.modernPlaceName}, ${zoomedStopObj.modernCountry} (${zoomedStopObj.ancientPlaceName})`
                      : saintTrail.globeHeaderSubtitle}
                  </h2>
                </div>

                {/* Camera & Label Controls */}
                <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setShowGlobeLabels((prev) => !prev)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#383024] bg-[#12100d]/90 px-2 py-1 text-[10px] font-semibold text-[#e6dccb] transition hover:border-[#d4af37] sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                    title="Toggle Floating City Callout Labels"
                  >
                    <Layers className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span>{showGlobeLabels ? 'Hide Labels' : 'Show Labels'}</span>
                  </button>

                  <button
                    onClick={resetRegionalOverview}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#d4af37]/50 bg-[#17130e]/90 px-2 py-1 text-[10px] font-semibold text-[#f3d27a] transition hover:bg-[#261f16] sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>{saintTrail.overviewButtonLabel}</span>
                  </button>

                  <button
                    onClick={resetFullPlanetOverview}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#383024] bg-[#12100d]/90 px-2 py-1 text-[10px] font-semibold text-[#cfc3ae] transition hover:border-[#d4af37] sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                    <span>Full Earth</span>
                  </button>
                </div>
              </div>

              {/* 3 Map Style Switcher Pill Bar */}
              <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto pb-0.5">
                <span className="mr-0.5 hidden shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#a39783] sm:inline-flex">
                  <MapIcon className="h-3 w-3 text-[#d4af37]" />
                  Style:
                </span>
                {(
                  [
                    { id: 'satellite_hd', label: 'Satellite HD & Sea Floor' },
                    { id: 'natgeo_atlas', label: 'NatGeo Atlas' },
                    { id: 'golden_twilight', label: 'Golden Dusk & Lights' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      soundEngine.playEffect('compass_click');
                      setMapStyle(mode.id);
                    }}
                    className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition sm:text-[11px] ${
                      mapStyle === mode.id
                        ? 'border-[#d4af37] bg-[#261e12] text-[#fef08a] shadow-sm'
                        : 'border-[#2c251c] bg-[#100e0b]/85 text-[#b8ab96] hover:border-[#d4af37]/50 hover:text-[#f4efe6]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D WebGL Canvas Mount (Touch-Action None for Smooth Android/iOS Pinch & Orbit) */}
            <div
              ref={mountRef}
              className="h-[370px] w-full touch-none select-none cursor-grab active:cursor-grabbing sm:h-[500px] lg:h-[560px]"
            />

            {/* SVG Leader Lines connecting exact surface pins to floating city callouts */}
            <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible">
              {trailStops.map((stop) => (
                <g key={stop.stopNumber}>
                  <line
                    ref={(el) => {
                      leaderLineRefs.current[stop.stopNumber] = el;
                    }}
                    stroke={stop.globePlacement.beaconColorHex}
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    style={{ opacity: 0 }}
                  />
                  <circle
                    ref={(el) => {
                      anchorDotRefs.current[stop.stopNumber] = el;
                    }}
                    r="3.5"
                    fill="#fef08a"
                    stroke="#120f0b"
                    strokeWidth="1.2"
                    style={{ opacity: 0 }}
                  />
                </g>
              ))}
            </svg>

            {/* Projected 2D Interactive City Callouts on the 3D Globe */}
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
              {trailStops.map((stop) => {
                const isSelected = zoomedStopNumber === stop.stopNumber;
                const isSolved = solvedStopNumbers.includes(stop.stopNumber);
                return (
                  <button
                    key={stop.stopNumber}
                    ref={(el) => {
                      labelRefs.current[stop.stopNumber] = el;
                    }}
                    onClick={() => zoomToStopOnGlobe(stop.stopNumber)}
                    style={{ opacity: 0 }}
                    className={`group absolute left-0 top-0 flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-left shadow-xl transition-colors ${
                      isSelected
                        ? 'z-30 border-[#facc15] bg-[#1f180d]/95 text-[#fef08a] ring-2 ring-[#facc15]/40'
                        : isSolved
                          ? 'z-20 border-emerald-500/70 bg-[#0d1f17]/95 text-emerald-200 hover:border-[#d4af37]'
                          : 'z-10 border-[#d4af37]/55 bg-[#0b111e]/92 text-[#f4efe6] hover:border-[#facc15] hover:bg-[#1a1610]'
                    }`}
                  >
                    <span
                      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-[#0c0a08]"
                      style={{ backgroundColor: stop.globePlacement.beaconColorHex }}
                    >
                      {isSolved ? '✓' : ''}
                    </span>
                    <div>
                      <p className="whitespace-nowrap text-[11px] font-bold leading-none">
                        {stop.modernPlaceName}, {stop.modernCountry}
                      </p>
                      <p className="mt-0.5 whitespace-nowrap text-[9px] text-[#c7b99e]">
                        {isSolved
                          ? `Stop ${stop.stopNumber} · ${stop.ancientPlaceName}`
                          : `Ancient ${stop.ancientPlaceName}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Warm Golden Sanctuary Portal Crossfade Overlay during the final 550ms of the dive */}
            <div
              className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ${
                cinematicPortalGlow ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 50% 54%, rgba(254, 240, 138, 0.92) 0%, rgba(212, 175, 55, 0.55) 38%, rgba(12, 10, 8, 0.95) 100%)',
              }}
            />

            {/* Cinematic Flight Overlay when swooping into a newly solved destination */}
            {cinematicFlightStop && (
              <div className="pointer-events-auto absolute inset-x-4 bottom-24 z-30 mx-auto flex max-w-lg items-center justify-between gap-3 rounded-2xl border border-[#facc15]/80 bg-[#14100b]/95 px-4 py-3 shadow-[0_0_30px_rgba(212,175,55,0.45)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#facc15] bg-[#261e12] text-[#fef08a]">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#facc15]">
                      Case #{cinematicFlightStop.stopNumber} Verified · 2-Stage Sanctuary Flight
                    </p>
                    <p className="font-serif text-sm font-bold text-[#f4efe6]">
                      {flightStageText ||
                        `Diving into ${cinematicFlightStop.modernPlaceName}, ${cinematicFlightStop.modernCountry}…`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    clearFlightTimers();
                    const target = cinematicFlightStop;
                    setCinematicFlightStop(null);
                    setFlightStageText('');
                    setCinematicPortalGlow(false);
                    setInspectedStop(target);
                  }}
                  className="shrink-0 rounded-lg border border-[#d4af37]/50 bg-[#241d13] px-2.5 py-1.5 text-[11px] font-bold text-[#fef08a] hover:border-[#facc15]"
                >
                  Skip to Scene
                </button>
              </div>
            )}

            {/* Zoomed-In City Action Bar at Bottom of 3D Globe */}
            {zoomedStopObj ? (
              <div className="border-t border-[#332a1e] bg-[#14110d] p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                        3D Satellite Camera Locked On
                      </span>
                      <span className="text-xs text-[#a39783]">·</span>
                      <span className="text-xs font-semibold text-emerald-300">
                        {zoomedStopObj.globePlacement.regionLabel}
                      </span>
                    </div>
                    <h3 className="mt-0.5 font-serif text-lg font-bold text-[#f4efe6]">
                      {zoomedStopObj.modernPlaceName}, {zoomedStopObj.modernCountry}{' '}
                      <span className="text-sm font-normal text-[#b8ab96]">
                        (Ancient {zoomedStopObj.ancientPlaceName})
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {!solvedStopNumbers.includes(currentCaseStop.stopNumber) && (
                      <button
                        onClick={() => handleConfirmCityForCase(zoomedStopObj)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120f0b] shadow-lg transition hover:brightness-110"
                      >
                        <Search className="h-4 w-4" />
                        Confirm & Dive for Case #{currentCaseStop.stopNumber}
                      </button>
                    )}

                    {solvedStopNumbers.includes(zoomedStopObj.stopNumber) ? (
                      <>
                        <button
                          onClick={() => flyAndEnterHistoricalScene(zoomedStopObj, true)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#d4af37]/60 bg-[#241d13] px-3 py-2.5 text-xs font-bold text-[#fef08a] transition hover:border-[#facc15]"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-[#facc15]" />
                          Replay 3D Flight & Dive
                        </button>
                        <button
                          onClick={() => {
                            soundEngine.playEffect('sanctuary_bell');
                            setInspectedStop(zoomedStopObj);
                            setActivePhotoHotspotId(zoomedStopObj.hiddenArtifacts[0].id);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/60 bg-emerald-950/30 px-3.5 py-2.5 text-xs font-bold text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-900/40"
                        >
                          <Eye className="h-4 w-4 text-emerald-300" />
                          View Stop Photo & Story
                        </button>
                      </>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#2c241b] bg-[#18140f] px-3 py-2.5 text-[11px] font-medium text-[#8c7f6b]"
                        title="Confirm the matching city for the active case to unlock its historical photo and story"
                      >
                        <Lock className="h-3.5 w-3.5 text-[#a39783]" />
                        <span>Scene Unlocks on Confirm</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Quick Zoom & 1-Click Confirm Dock for All 6 Modern-Day Cities on the Globe */
              <div className="border-t border-[#262018] bg-[#120f0c] px-4 py-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#a39783]">
                  Fly 3D Camera to Any Trail City — or 1-Click Confirm Directly:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {trailStops.map((stop) => {
                    const isSolved = solvedStopNumbers.includes(stop.stopNumber);
                    return (
                      <div
                        key={stop.stopNumber}
                        className={`inline-flex items-center overflow-hidden rounded-lg border text-xs font-medium transition ${
                          isSolved
                            ? 'border-emerald-600/40 bg-emerald-950/25 text-emerald-200'
                            : 'border-[#2f271d] bg-[#1a1510] text-[#e6dccb]'
                        }`}
                      >
                        <button
                          onClick={() => zoomToStopOnGlobe(stop.stopNumber)}
                          title={`Fly 3D camera over ${stop.modernPlaceName}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 transition hover:bg-[#d4af37]/15 hover:text-[#f4efe6]"
                        >
                          <ZoomIn className="h-3.5 w-3.5 text-[#d4af37]" />
                          <span>
                            {stop.modernPlaceName}, {stop.modernCountry}
                          </span>
                        </button>
                        {isSolved ? (
                          <button
                            onClick={() => {
                              soundEngine.playEffect('sanctuary_bell');
                              setInspectedStop(stop);
                              setActivePhotoHotspotId(stop.hiddenArtifacts[0].id);
                            }}
                            title={`Revisit ${stop.ancientPlaceName} historical scene`}
                            className="inline-flex items-center gap-1 border-l border-emerald-600/30 bg-emerald-900/35 px-2 py-1.5 text-[11px] font-semibold text-emerald-200 transition hover:bg-emerald-800/50"
                          >
                            <Eye className="h-3 w-3 text-emerald-300" />
                            <span>Scene</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConfirmCityForCase(stop)}
                            disabled={cinematicFlightStop !== null}
                            title={`Confirm ${stop.modernPlaceName} for Case #${currentCaseStop.stopNumber} & fly into historical scene`}
                            className="inline-flex items-center gap-1 border-l border-[#2f271d] bg-[#d4af37]/15 px-2 py-1.5 text-[11px] font-bold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#14110d] disabled:opacity-50"
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>Confirm</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Detective Case Clues & Investigation Dossier */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#2d251b] bg-[#15120e] p-5 shadow-2xl">
          <div>
            {/* Case Header */}
            <div className="flex items-start justify-between gap-2 border-b border-[#262018] pb-3.5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Active Pilgrim Detective Dossier · {currentCaseStop.eraLabel}
                </span>
                <h2 className="mt-1 font-serif text-xl font-bold text-[#f4efe6]">
                  {currentCaseStop.detectiveCaseTitle}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={() => {
                    if (isNarrating) {
                      soundEngine.stopSpeaking();
                      setIsNarrating(false);
                    } else {
                      setIsNarrating(true);
                      soundEngine.playAndrewNarration(
                        currentCaseStop.stopNumber,
                        'clue',
                        () => setIsNarrating(false),
                        saintTrail.id
                      );
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition ${
                    isNarrating
                      ? 'border-[#facc15] bg-[#2b2212] text-[#fef08a]'
                      : 'border-[#d4af37]/60 bg-[#221a11] text-[#f3d27a] hover:border-[#d4af37]'
                  }`}
                  title="Hear Andrew share an exclusive spoken Modern-Day City clue not written on the card"
                >
                  {isNarrating ? (
                    <>
                      <Square className="h-3 w-3 fill-current" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5 text-[#d4af37]" />
                      <span>Audio City Clue</span>
                    </>
                  )}
                </button>

                {solvedStopNumbers.includes(currentCaseStop.stopNumber) && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    Solved
                  </span>
                )}
              </div>
            </div>

            {/* Lead Detective Prompt */}
            <p className="mt-3 text-sm leading-relaxed text-[#cfc3ae]">
              {currentCaseStop.detectiveLeadPrompt}
            </p>

            {/* Feedback Banner */}
            <div
              className={`mt-3.5 rounded-xl border p-3 text-xs leading-relaxed ${
                feedbackBanner.type === 'success'
                  ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-200'
                  : feedbackBanner.type === 'mismatch'
                    ? 'border-amber-500/50 bg-amber-950/30 text-amber-200'
                    : 'border-[#332a1e] bg-[#1c1711] text-[#d8ccb8]'
              }`}
            >
              {feedbackBanner.text}
            </div>

            {/* 3 Progressive Detective Clue Cards */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Detective Evidence Clues (Click to Reveal & Hear Chime)
                </span>
                <span className="text-[11px] text-[#9a8e7a]">
                  {
                    currentCaseStop.detectiveClues.filter((c) => revealedClueIds.includes(c.id))
                      .length
                  }{' '}
                  / 3 Clues Opened
                </span>
              </div>

              {currentCaseStop.detectiveClues.map((clue) => {
                const isRevealed = revealedClueIds.includes(clue.id);
                return (
                  <div
                    key={clue.id}
                    className={`rounded-xl border transition-all ${
                      isRevealed
                        ? 'border-[#3d3224] bg-[#1d1812] p-3.5'
                        : 'border-dashed border-[#3a3023] bg-[#18140f] p-3 hover:border-[#d4af37]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                          clue.clueNumber === 1
                            ? 'text-emerald-400'
                            : clue.clueNumber === 2
                              ? 'text-amber-300'
                              : 'text-[#d4af37]'
                        }`}
                      >
                        {clue.clueNumber === 1 && <MapPin className="h-3.5 w-3.5" />}
                        {clue.clueNumber === 2 && <HelpCircle className="h-3.5 w-3.5" />}
                        {clue.clueNumber === 3 && <BookOpen className="h-3.5 w-3.5" />}
                        Clue #{clue.clueNumber} · {clue.badgeLabel}
                      </span>

                      {!isRevealed && (
                        <button
                          onClick={() => handleRevealClue(clue.id, clue.soundCue)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#282118] px-2.5 py-1 text-[11px] font-bold text-[#f3d27a] hover:bg-[#362c20]"
                        >
                          <Sparkles className="h-3 w-3" />
                          Reveal Clue
                        </button>
                      )}
                    </div>

                    {isRevealed ? (
                      <div className="mt-2">
                        <h4 className="font-serif text-sm font-bold text-[#f4efe6]">
                          {clue.headline}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#cfc3ae]">
                          {clue.clueText}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRevealClue(clue.id, clue.soundCue)}
                        className="mt-1.5 w-full text-left text-xs text-[#8c7f6b] hover:text-[#cfc3ae]"
                      >
                        Click to unseal Clue #{clue.clueNumber} ({clue.badgeLabel})…
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Suspect City Selector & Case Navigation (Supports Option B: 1-Click Fly & Confirm from Full Globe!) */}
          <div className="mt-5 border-t border-[#262018] pt-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Suspect Cities (Zoom or 1-Click Confirm & Fly):
              </p>
              <span className="text-[10px] text-[#9a8e7a]">
                Click <strong className="text-[#f3d27a]">Fly & Confirm</strong> from anywhere!
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {trailStops.map((stop) => {
                const isZoomed = zoomedStopNumber === stop.stopNumber;
                const isSolved = solvedStopNumbers.includes(stop.stopNumber);
                const isCurrentCaseSolved = solvedStopNumbers.includes(currentCaseStop.stopNumber);
                return (
                  <div
                    key={stop.stopNumber}
                    className={`flex items-center justify-between gap-1.5 rounded-xl border p-1.5 text-xs transition ${
                      isZoomed
                        ? 'border-[#facc15] bg-[#282012] text-[#fef08a]'
                        : isSolved
                          ? 'border-emerald-700/40 bg-emerald-950/20 text-emerald-200'
                          : 'border-[#2c241b] bg-[#1b1611] text-[#e6dccb]'
                    }`}
                  >
                    <button
                      onClick={() => zoomToStopOnGlobe(stop.stopNumber)}
                      className="flex min-w-0 flex-1 items-center gap-1.5 px-1.5 py-1 text-left hover:text-[#fef08a]"
                      title={`Zoom 3D Camera to ${stop.modernPlaceName}, ${stop.modernCountry}`}
                    >
                      <ZoomIn className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                      <span className="truncate font-medium">
                        {stop.modernPlaceName}, {stop.modernCountry}
                      </span>
                    </button>

                    {!isCurrentCaseSolved ? (
                      <button
                        onClick={() => handleConfirmCityForCase(stop)}
                        className="shrink-0 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b58922] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#120f0b] shadow-sm transition hover:brightness-110"
                        title={`Fly 3D Camera & Confirm ${stop.modernPlaceName} for Case #${currentCaseStop.stopNumber}`}
                      >
                        Confirm
                      </button>
                    ) : isSolved ? (
                      <button
                        onClick={() => flyAndEnterHistoricalScene(stop)}
                        className="shrink-0 rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-2 py-1 text-[10px] font-bold text-emerald-200 hover:bg-emerald-900/50"
                        title={`Fly into ${stop.modernPlaceName} & Open Historical Scene`}
                      >
                        Enter
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Confirm or Revisit Solved Stop Photo & Story Buttons */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              {zoomedStopObj && !solvedStopNumbers.includes(currentCaseStop.stopNumber) && (
                <button
                  onClick={() => handleConfirmCityForCase(zoomedStopObj)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120f0b] shadow-lg transition hover:brightness-110"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm {zoomedStopObj.modernPlaceName} for Case #{currentCaseStop.stopNumber}
                </button>
              )}

              {solvedStopNumbers.includes(currentCaseStop.stopNumber) && (
                <button
                  onClick={() => {
                    soundEngine.playEffect('sanctuary_bell');
                    setInspectedStop(currentCaseStop);
                    setActivePhotoHotspotId(currentCaseStop.hiddenArtifacts[0].id);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/30 px-3.5 py-2.5 text-xs font-bold text-emerald-200 hover:bg-emerald-900/40"
                >
                  <Eye className="h-4 w-4" />
                  View Stop Photo & Story ({currentCaseStop.modernPlaceName})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* UNLOCKED / INSPECTED STOP PHOTO & MODERN-DAY STORY MODAL */}
      {inspectedStop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2.5 sm:p-4">
          <div className="max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#d4af37]/50 bg-[#14110d] shadow-2xl">
            {/* Modal Top Bar (Sticky for Mobile/Android) */}
            <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2.5 border-b border-[#2b231a] bg-[#1a1510]/95 px-4 py-3.5 backdrop-blur-md sm:px-6 sm:py-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#d4af37]">
                    Trail Stop {inspectedStop.stopNumber} of {trailStops.length} · {inspectedStop.eraLabel}
                  </span>
                  {solvedStopNumbers.includes(inspectedStop.stopNumber) && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified on 3D Globe
                    </span>
                  )}
                </div>
                <h3 className="mt-0.5 font-serif text-lg font-bold text-[#f4efe6] sm:text-2xl">
                  {inspectedStop.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    if (isNarrating) {
                      soundEngine.stopSpeaking();
                      setIsNarrating(false);
                    } else {
                      setIsNarrating(true);
                      soundEngine.playAndrewNarration(
                        inspectedStop.stopNumber,
                        'city',
                        () => setIsNarrating(false),
                        saintTrail.id
                      );
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition sm:px-3.5 ${
                    isNarrating
                      ? 'border-[#facc15] bg-[#2b2212] text-[#fef08a]'
                      : 'border-[#d4af37]/50 bg-[#241d14] text-[#f3d27a] hover:border-[#d4af37]'
                  }`}
                  title="Hear Andrew share a bonus 3-line fun fact about this modern-day city today (not written below!)"
                >
                  {isNarrating ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-current" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      <span>Modern City Audio Fact</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    soundEngine.stopSpeaking();
                    setIsNarrating(false);
                    zoomToStopOnGlobe(inspectedStop.stopNumber);
                    setInspectedStop(null);
                  }}
                  className="rounded-xl border border-[#3a3023] bg-[#221c15] px-3 py-2 text-xs font-semibold text-[#e6dccb] hover:border-[#d4af37] sm:px-3.5"
                >
                  Back to Globe
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 lg:grid-cols-12">
              {/* Left 7 Cols: Stop Photograph with Interactive Story Hotspots */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-[#382e21] bg-[#0d0b08]">
                  <ResilientImage
                    src={inspectedStop.image}
                    alt={inspectedStop.title}
                    className="h-[240px] w-full object-cover sm:h-[360px]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

                  {/* Interactive Hotspots on the Stop Photo */}
                  {inspectedStop.hiddenArtifacts.map((art) => {
                    const isActive = activePhotoHotspotId === art.id;
                    return (
                      <button
                        key={art.id}
                        onClick={() => {
                          soundEngine.playEffect(art.soundCue);
                          setActivePhotoHotspotId(art.id);
                        }}
                        style={{ left: `${art.xPercent}%`, top: `${art.yPercent}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold shadow-lg transition-transform ${
                          isActive
                            ? 'scale-110 border-[#fef08a] bg-[#d4af37] text-[#120f0b]'
                            : 'border-[#d4af37] bg-[#14110d]/90 text-[#f3d27a] hover:scale-105'
                        }`}
                      >
                        <Flame className="h-3.5 w-3.5" />
                        <span>#{art.orderNumber}</span>
                      </button>
                    );
                  })}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-xs text-[#e6dccb]">
                    <span className="font-medium">{inspectedStop.imageCaption}</span>
                  </div>
                </div>

                {/* Selected Photo Hotspot Detail */}
                {(() => {
                  const activeArt =
                    inspectedStop.hiddenArtifacts.find((a) => a.id === activePhotoHotspotId) ||
                    inspectedStop.hiddenArtifacts[0];
                  return (
                    <div className="mt-3 rounded-xl border border-[#332a1e] bg-[#1b1611] p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                          Photo Detail #{activeArt.orderNumber} · {activeArt.category}
                        </span>
                        <span className="text-[11px] text-[#9a8e7a]">
                          Click markers #1, #2, #3 on photo
                        </span>
                      </div>
                      <h4 className="mt-1 font-serif text-sm font-bold text-[#f4efe6]">
                        {activeArt.foundTitle}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#cfc3ae]">
                        {activeArt.storyUnlocked}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Right 5 Cols: Modern-Day City Now, Did You Know, and Next Case Button */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  {/* Ancient -> Modern City Card */}
                  <div className="rounded-xl border border-emerald-600/35 bg-emerald-950/20 p-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      <MapPin className="h-3.5 w-3.5" />
                      Where Is It Modern Day Now?
                    </div>
                    <p className="mt-1 font-serif text-base font-bold text-[#f4efe6]">
                      Ancient {inspectedStop.ancientPlaceName} → Today:{' '}
                      <span className="text-emerald-300">
                        {inspectedStop.modernPlaceName}, {inspectedStop.modernCountry}
                      </span>
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#d4cbbe]">
                      {inspectedStop.whatYouCanSeeToday}
                    </p>
                  </div>

                  {/* Did You Know Card */}
                  <div className="rounded-xl border border-amber-500/35 bg-amber-950/20 p-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Did You Know?
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#e6dccb]">
                      {inspectedStop.didYouKnowHighlight}
                    </p>
                  </div>

                  {/* Saint Quote */}
                  <blockquote className="rounded-xl border border-[#2f271d] bg-[#1a1510] p-3.5 italic text-xs text-[#cfc3ae]">
                    {inspectedStop.saintQuote}
                  </blockquote>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => {
                      soundEngine.stopSpeaking();
                      setIsNarrating(false);
                      zoomToStopOnGlobe(inspectedStop.stopNumber);
                      setInspectedStop(null);
                    }}
                    className="rounded-xl border border-[#3a3023] bg-[#1f1913] px-4 py-2.5 text-xs font-semibold text-[#e6dccb] hover:border-[#d4af37]"
                  >
                    Back to 3D Globe
                  </button>

                  {activeCaseIndex < trailStops.length - 1 ? (
                    <button
                      onClick={() => {
                        soundEngine.playEffect('vellum_page');
                        const nextIdx = activeCaseIndex + 1;
                        setActiveCaseIndex(nextIdx);
                        setInspectedStop(null);
                        resetRegionalOverview();
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120f0b] shadow-lg hover:brightness-110"
                    >
                      <span>Investigate Case #{activeCaseIndex + 2}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundEngine.playEffect('pilgrimage_complete');
                        setInspectedStop(null);
                        setShowCompletionModal(true);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#091510] shadow-lg"
                    >
                      <Award className="h-4 w-4" />
                      Complete 3D Globe Pilgrimage
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full 6-Stop Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="max-w-lg rounded-3xl border border-[#d4af37] bg-[#16120d] p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37] bg-[#261f15] text-[#f3d27a]">
              <Award className="h-7 w-7" />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              {saintTrail.saintName} · 3D Globe Trail Complete
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#f4efe6]">
              All 6 Sanctuary Beacons Unlocked!
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#cfc3ae]">
              {saintTrail.completionSummary}
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  resetRegionalOverview();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120f0b]"
              >
                <Compass className="h-4 w-4" />
                Explore 3D Globe Freely
              </button>
              <button
                onClick={() => {
                  setSolvedStopNumbers([]);
                  setActiveCaseIndex(0);
                  setShowCompletionModal(false);
                  resetRegionalOverview();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#3a3023] bg-[#211b14] px-4 py-2.5 text-xs font-semibold text-[#e6dccb]"
              >
                <RotateCcw className="h-4 w-4" />
                Replay Detective Cases
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
