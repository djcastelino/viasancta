import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Compass,
  Sparkles,
  MapPin,
  BookOpen,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  Map as MapIcon,
  Volume2,
  Square,
  Play,
  Landmark,
  RotateCcw,
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

function getStopNarrativeParagraphs(stop: TrailStop): string[] {
  const seen = new Set<string>();
  const addClean = (txt?: string) => {
    const t = (txt || '').trim();
    if (!t) return null;
    const key = t.toLowerCase().slice(0, 72);
    if (seen.has(key)) return null;
    seen.add(key);
    return t;
  };

  // Mark whatYouCanSeeToday and didYouKnowHighlight so we don't repeat them in the main prose
  if (stop.whatYouCanSeeToday) {
    seen.add(stop.whatYouCanSeeToday.trim().toLowerCase().slice(0, 72));
  }
  if (stop.didYouKnowHighlight) {
    seen.add(stop.didYouKnowHighlight.trim().toLowerCase().slice(0, 72));
  }

  const out: string[] = [];
  for (const art of stop.hiddenArtifacts || []) {
    const cleaned = addClean(art.storyUnlocked);
    if (cleaned) out.push(cleaned);
  }
  if (out.length === 0) {
    for (const clue of stop.detectiveClues || []) {
      const cleaned = addClean(clue.clueText);
      if (cleaned) {
        out.push(cleaned);
        break;
      }
    }
  }
  return out;
}

function buildAndrewStopScript(saintName: string, stop: TrailStop, totalStops: number): string {
  const paragraphs = getStopNarrativeParagraphs(stop);
  const mainStory = paragraphs.join(' ');
  const pieces = [
    `Stop ${stop.stopNumber} of ${totalStops} in the life of ${saintName}: ${stop.title}, in ${stop.modernPlaceName}, ${stop.modernCountry}.`,
    mainStory,
    stop.whatYouCanSeeToday ? `Today: ${stop.whatYouCanSeeToday}` : '',
    stop.saintQuote ? `${saintName} reminds us: ${stop.saintQuote}` : '',
  ];
  return pieces.filter(Boolean).join(' ');
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

  // Non-gamified guided pilgrimage state (all stops immediately unlocked)
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [visitedStopNumbers, setVisitedStopNumbers] = useState<number[]>(() =>
    trailStops[0] ? [trailStops[0].stopNumber] : []
  );
  const [zoomedStopNumber, setZoomedStopNumber] = useState<number | null>(null);
  const [showGlobeLabels, setShowGlobeLabels] = useState<boolean>(true);
  const [mapStyle, setMapStyle] = useState<GlobeMapStyle>('satellite_hd');
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);

  const autoTourRef = useRef<boolean>(false);
  const autoTourTimerRef = useRef<number | null>(null);
  const currentStop = trailStops[activeStopIndex] || trailStops[0];

  const clearAutoTourTimer = useCallback(() => {
    if (autoTourTimerRef.current !== null) {
      window.clearTimeout(autoTourTimerRef.current);
      autoTourTimerRef.current = null;
    }
  }, []);

  const stopNarrationAndTour = useCallback(() => {
    autoTourRef.current = false;
    setIsAutoTouring(false);
    clearAutoTourTimer();
    soundEngine.stopSpeaking();
    setIsNarrating(false);
  }, [clearAutoTourTimer]);

  useEffect(() => {
    return () => {
      autoTourRef.current = false;
      clearAutoTourTimer();
      soundEngine.stopSpeaking();
    };
  }, [clearAutoTourTimer]);

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

  // Reset cleanly when switching between Saint Trails
  useEffect(() => {
    stopNarrationAndTour();
    setActiveStopIndex(0);
    setVisitedStopNumbers(saintTrail.stops[0] ? [saintTrail.stops[0].stopNumber] : []);
    setZoomedStopNumber(null);

    const ov = saintTrail.overviewCamera;
    startSmoothCameraFlight(
      latLngToVector3(ov.camLat, ov.camLng, GLOBE_RADIUS + ov.camAltitude),
      latLngToVector3(ov.lookLat, ov.lookLng, GLOBE_RADIUS * ov.lookRadiusScale),
      1400,
      1.2
    );
  }, [saintTrail, stopNarrationAndTour, startSmoothCameraFlight]);

  useEffect(() => {
    onSolvedCountChange?.(visitedStopNumbers.length);
  }, [visitedStopNumbers.length, onSolvedCountChange]);

  // Keep all trail arcs softly illuminated for every stop in the non-gamified journey
  const solvedStopNumbersRef = useRef<number[]>(trailStops.map((s) => s.stopNumber));
  useEffect(() => {
    solvedStopNumbersRef.current = trailStops.map((s) => s.stopNumber);
  }, [trailStops]);

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
      borderGroupRef.current.visible = mapStyle !== 'natgeo_atlas';
    }
  }, [mapStyle]);

  const zoomToStopOnGlobe = useCallback(
    (stopNumber: number, keepAutoTour = false) => {
      if (!keepAutoTour) {
        stopNarrationAndTour();
      }
      soundEngine.playEffect('compass_click');
      soundEngine.playCityBiomeAudio(stopNumber);
      const idx = trailStops.findIndex((s) => s.stopNumber === stopNumber);
      const stopObj = idx >= 0 ? trailStops[idx] : trailStops[0];
      if (idx >= 0) {
        setActiveStopIndex(idx);
      }
      if (stopObj) {
        setVisitedStopNumbers((prev) =>
          prev.includes(stopObj.stopNumber) ? prev : [...prev, stopObj.stopNumber]
        );
      }
      const lat = stopObj ? stopObj.globePlacement.latDeg : 40.5;
      const lng = stopObj ? stopObj.globePlacement.lngDeg : 9.5;
      const surfacePos = latLngToVector3(lat, lng, GLOBE_RADIUS);
      const camPos = latLngToVector3(lat - 1.9, lng - 0.4, GLOBE_RADIUS + 2.45);
      startSmoothCameraFlight(camPos, surfacePos, 1450, 1.8);
      setZoomedStopNumber(stopNumber);
    },
    [trailStops, stopNarrationAndTour, startSmoothCameraFlight]
  );

  const replayWideFlightToStop = useCallback(
    (stop: TrailStop) => {
      soundEngine.playEffect('compass_click');
      const lat = stop.globePlacement.latDeg;
      const lng = stop.globePlacement.lngDeg;
      const surfacePos = latLngToVector3(lat, lng, GLOBE_RADIUS);
      const camPos = latLngToVector3(lat - 1.9, lng - 0.4, GLOBE_RADIUS + 2.45);
      const wideStartCamPos = latLngToVector3(
        Math.max(-20, Math.min(52, lat + 15)),
        lng - 34,
        GLOBE_RADIUS + 12.5
      );
      startSmoothCameraFlight(
        camPos,
        surfacePos,
        1850,
        2.3,
        wideStartCamPos,
        new THREE.Vector3(0, 0, 0)
      );
      setZoomedStopNumber(stop.stopNumber);
    },
    [startSmoothCameraFlight]
  );

  const resetRegionalOverview = useCallback(() => {
    soundEngine.playEffect('vellum_page');
    const ov = saintTrail.overviewCamera;
    startSmoothCameraFlight(
      latLngToVector3(ov.camLat, ov.camLng, GLOBE_RADIUS + ov.camAltitude),
      latLngToVector3(ov.lookLat, ov.lookLng, GLOBE_RADIUS * ov.lookRadiusScale),
      1400,
      1.0
    );
    setZoomedStopNumber(null);
  }, [saintTrail, startSmoothCameraFlight]);

  const resetFullPlanetOverview = useCallback(() => {
    soundEngine.playEffect('vellum_page');
    const ov = saintTrail.overviewCamera;
    startSmoothCameraFlight(
      latLngToVector3(24.0, ov.camLng, GLOBE_RADIUS + 14.5),
      new THREE.Vector3(0, 0, 0),
      1450,
      0.5
    );
    setZoomedStopNumber(null);
  }, [saintTrail, startSmoothCameraFlight]);

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


  const speakStopAtIndex = useCallback(
    (idx: number, continueTour: boolean) => {
      const stop = trailStops[idx];
      if (!stop) {
        stopNarrationAndTour();
        return;
      }
      setIsNarrating(true);
      const script = buildAndrewStopScript(saintTrail.saintName, stop, trailStops.length);
      soundEngine.speakNarration(script, () => {
        setIsNarrating(false);
        if (continueTour && autoTourRef.current) {
          if (idx < trailStops.length - 1) {
            const nextIdx = idx + 1;
            const nextStop = trailStops[nextIdx];
            zoomToStopOnGlobe(nextStop.stopNumber, true);
            clearAutoTourTimer();
            autoTourTimerRef.current = window.setTimeout(() => {
              if (autoTourRef.current) {
                speakStopAtIndex(nextIdx, true);
              }
            }, 1650);
          } else {
            autoTourRef.current = false;
            setIsAutoTouring(false);
            resetRegionalOverview();
          }
        }
      });
    },
    [trailStops, saintTrail.saintName, stopNarrationAndTour, zoomToStopOnGlobe, clearAutoTourTimer, resetRegionalOverview]
  );

  const handleListenAndrew = () => {
    if (isNarrating) {
      stopNarrationAndTour();
      return;
    }
    soundEngine.unlockNarrationForUserGesture();
    autoTourRef.current = false;
    setIsAutoTouring(false);
    speakStopAtIndex(activeStopIndex, false);
  };

  const handleToggleAutoTour = () => {
    if (isAutoTouring) {
      stopNarrationAndTour();
      return;
    }
    soundEngine.unlockNarrationForUserGesture();
    autoTourRef.current = true;
    setIsAutoTouring(true);
    zoomToStopOnGlobe(currentStop.stopNumber, true);
    clearAutoTourTimer();
    autoTourTimerRef.current = window.setTimeout(() => {
      if (autoTourRef.current) {
        speakStopAtIndex(activeStopIndex, true);
      }
    }, 900);
  };

  const goToStopByIndex = (idx: number) => {
    if (idx < 0 || idx >= trailStops.length) return;
    zoomToStopOnGlobe(trailStops[idx].stopNumber);
  };

  const zoomedStopObj = zoomedStopNumber
    ? trailStops.find((s) => s.stopNumber === zoomedStopNumber) || null
    : null;
  const narrativeParagraphs = getStopNarrativeParagraphs(currentStop);
  const isLastStop = activeStopIndex === trailStops.length - 1;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8">
      {/* Top Pilgrimage Route Stepper (All Stops Unlocked — Travertine Stone & Olive) */}
      <div className="mb-5 rounded-2xl border border-[#DCD2C0] bg-[#FCFBF8] p-3.5 shadow-[0_10px_28px_rgba(34,30,26,0.06)] sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 shrink-0 text-[#4F6348]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A65B3A] sm:text-xs">
              Pilgrimage Route · Footsteps of {saintTrail.saintName} ({trailStops.length} Stops)
            </span>
          </div>
          <span className="text-xs font-medium text-[#655C50]">
            Stop{' '}
            <strong className="text-[#221E1A]">
              {activeStopIndex + 1} of {trailStops.length}
            </strong>
          </span>
        </div>

        <div
          className={`grid gap-2 ${
            trailStops.length <= 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : trailStops.length === 4
                ? 'grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {trailStops.map((stop, idx) => {
            const isActive = idx === activeStopIndex;
            const isVisited = visitedStopNumbers.includes(stop.stopNumber);
            return (
              <button
                key={stop.stopNumber}
                onClick={() => goToStopByIndex(idx)}
                className={`group flex min-h-[62px] flex-col justify-between rounded-xl border px-3 py-2.5 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#4F6348] bg-[#4F6348] text-white shadow-[0_8px_20px_rgba(79,99,72,0.22)]'
                    : 'border-[#DCD2C0] bg-[#F5F0E6] text-[#221E1A] hover:border-[#4F6348]/60 hover:bg-[#ECE4D6]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? 'text-[#E3EBD9]' : 'text-[#A65B3A]'
                    }`}
                  >
                    Stop {stop.stopNumber}
                  </span>
                  {isVisited && !isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#4F6348]/70" title="Visited" />
                  )}
                </div>
                <p
                  className={`mt-0.5 line-clamp-1 font-serif text-sm font-bold ${
                    isActive ? 'text-white' : 'text-[#221E1A]'
                  }`}
                >
                  {stop.modernPlaceName}, {stop.modernCountry}
                </p>
                <p
                  className={`mt-0.5 line-clamp-1 text-[10px] ${
                    isActive ? 'text-[#DCE5D5]' : 'text-[#655C50]'
                  }`}
                >
                  {stop.eraLabel}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 12-Column Split: 7 Cols Ultra-HD 3D Earth + 5 Cols Editorial Pilgrimage Story Card */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 items-start">
        {/* LEFT 7 COLUMNS: Full Existing Ultra-HD 3D Globe Viewport (100% Preserved) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative overflow-hidden rounded-2xl border border-[#CFC4B0] bg-[#02050b] shadow-[0_22px_54px_rgba(34,30,26,0.16)]">
            {/* Top HUD inside Globe (All 3 Map Styles + Zoom/Overview + Labels Preserved) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col gap-2 bg-gradient-to-b from-[#060b14]/95 via-[#060b14]/70 to-transparent px-3 py-2.5 sm:px-4 sm:py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-[#e6cfa3] sm:text-[10px]">
                    3D Sacred Earth · Drag to Rotate · Pinch or Click Any City
                  </p>
                  <h2 className="truncate font-serif text-sm font-bold text-[#f7f3eb] sm:text-lg">
                    {zoomedStopObj
                      ? `${zoomedStopObj.modernPlaceName}, ${zoomedStopObj.modernCountry} (${zoomedStopObj.ancientPlaceName})`
                      : saintTrail.globeHeaderSubtitle}
                  </h2>
                </div>

                {/* Camera & Label Controls */}
                <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setShowGlobeLabels((prev) => !prev)}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-[#0d1520]/90 px-2 py-1 text-[10px] font-semibold text-[#f0eae0] transition hover:border-[#c8b288] sm:px-2.5 sm:py-1.5 sm:text-[11px] cursor-pointer"
                    title="Toggle Floating City Callout Labels"
                  >
                    <Layers className="h-3.5 w-3.5 text-[#d9be8a]" />
                    <span>{showGlobeLabels ? 'Hide Labels' : 'Show Labels'}</span>
                  </button>
                  <button
                    onClick={resetRegionalOverview}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#7fa174]/70 bg-[#1f2e1c]/90 px-2 py-1 text-[10px] font-semibold text-[#e6f0e1] transition hover:bg-[#2b3f27] sm:px-2.5 sm:py-1.5 sm:text-[11px] cursor-pointer"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>{saintTrail.overviewButtonLabel}</span>
                  </button>
                  <button
                    onClick={resetFullPlanetOverview}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-[#0d1520]/90 px-2 py-1 text-[10px] font-semibold text-[#d7d0c4] transition hover:border-[#c8b288] sm:px-2.5 sm:py-1.5 sm:text-[11px] cursor-pointer"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                    <span>Full Earth</span>
                  </button>
                </div>
              </div>

              {/* 3 Map Style Switcher Pill Bar (Satellite HD · NatGeo Atlas · Golden Dusk & Lights) */}
              <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto pb-0.5">
                <span className="mr-0.5 hidden shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#c7bfb2] sm:inline-flex">
                  <MapIcon className="h-3 w-3 text-[#d9be8a]" />
                  Globe View:
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
                    className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition sm:text-[11px] cursor-pointer ${
                      mapStyle === mode.id
                        ? 'border-[#e6cfa3] bg-[#4F6348] text-white shadow-sm'
                        : 'border-white/15 bg-[#0b111c]/85 text-[#d1c9bc] hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D WebGL Canvas Mount */}
            <div
              ref={mountRef}
              className="h-[370px] w-full touch-none select-none cursor-grab active:cursor-grabbing sm:h-[500px] lg:h-[580px]"
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
                const isSelected = currentStop.stopNumber === stop.stopNumber;
                return (
                  <button
                    key={stop.stopNumber}
                    ref={(el) => {
                      labelRefs.current[stop.stopNumber] = el;
                    }}
                    onClick={() => zoomToStopOnGlobe(stop.stopNumber)}
                    style={{ opacity: 0 }}
                    className={`group absolute left-0 top-0 flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-left shadow-xl transition-colors cursor-pointer ${
                      isSelected
                        ? 'z-30 border-[#e6cfa3] bg-[#4F6348]/95 text-white ring-2 ring-[#e6cfa3]/40'
                        : 'z-10 border-white/25 bg-[#0c1420]/90 text-[#f4efe6] hover:border-[#e6cfa3] hover:bg-[#1a2638]'
                    }`}
                  >
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-[#14110c]"
                      style={{ backgroundColor: stop.globePlacement.beaconColorHex }}
                    >
                      {stop.stopNumber}
                    </span>
                    <div>
                      <p className="whitespace-nowrap text-[11px] font-bold leading-none">
                        {stop.modernPlaceName}, {stop.modernCountry}
                      </p>
                      <p className="mt-0.5 whitespace-nowrap text-[9px] text-[#d6cec0]">
                        {stop.ancientPlaceName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clean Sunlit Travertine Status Bar below 3D Earth */}
            <div className="border-t border-[#DCD2C0] bg-[#FCFBF8] px-4 py-3.5 text-[#221E1A]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#A65B3A]">
                      <MapPin className="h-3.5 w-3.5" />
                      {currentStop.globePlacement.regionLabel}
                    </span>
                    <span className="text-xs text-[#A39A8C]">·</span>
                    <span className="text-xs font-medium text-[#655C50]">
                      Stop {currentStop.stopNumber} of {trailStops.length}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-base font-bold text-[#221E1A] sm:text-lg">
                    {currentStop.modernPlaceName}, {currentStop.modernCountry}{' '}
                    <span className="text-sm font-normal text-[#655C50]">
                      (Historically {currentStop.ancientPlaceName})
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => replayWideFlightToStop(currentStop)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCD2C0] bg-[#F3EDE2] px-3 py-2 text-xs font-semibold text-[#221E1A] transition hover:border-[#4F6348] hover:bg-[#EAEFE7] cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#4F6348]" />
                    <span>Fly to Stop</span>
                  </button>
                  <button
                    onClick={resetRegionalOverview}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCD2C0] bg-[#FCFBF8] px-3 py-2 text-xs font-semibold text-[#655C50] transition hover:border-[#4F6348] hover:text-[#221E1A] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Overview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Sunlit Travertine Stone & Olive Guided Story Card */}
        <article className="lg:col-span-5 overflow-hidden rounded-2xl border border-[#DCD2C0] bg-[#FCFBF8] shadow-[0_18px_44px_rgba(34,30,26,0.08)]">
          {/* Museum-Framed Renaissance Oil Painting */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#221E1A]">
            <ResilientImage
              src={currentStop.image}
              alt={currentStop.title}
              className="h-full w-full object-cover"
            />
            {currentStop.imageCaption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161310]/90 via-[#161310]/45 to-transparent px-4 pb-3 pt-10">
                <p className="text-xs leading-relaxed text-[#F4EFE6]">
                  {currentStop.imageCaption}
                </p>
              </div>
            )}
          </div>

          {/* Editorial Content */}
          <div className="p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A65B3A]">
              Stop {currentStop.stopNumber} of {trailStops.length} · {currentStop.eraLabel}
            </p>
            <h2 className="mt-1.5 font-serif text-2xl font-bold leading-snug text-[#221E1A] sm:text-3xl">
              {currentStop.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#655C50]">
              {currentStop.modernPlaceName}, {currentStop.modernCountry}
              {currentStop.ancientPlaceName &&
              currentStop.ancientPlaceName.toLowerCase() !==
                currentStop.modernPlaceName.toLowerCase()
                ? ` · Historically ${currentStop.ancientPlaceName}`
                : ''}
            </p>

            {/* Voice Narration & Hands-Free Guided Auto-Tour */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleListenAndrew}
                className="inline-flex items-center gap-2 rounded-xl bg-[#4F6348] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3F5139] cursor-pointer"
              >
                {isNarrating ? (
                  <>
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop Andrew</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span>Listen with Andrew</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleToggleAutoTour}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition cursor-pointer ${
                  isAutoTouring
                    ? 'border-[#A65B3A] bg-[#F7ECE6] text-[#8E4A2D]'
                    : 'border-[#C8D4C2] bg-[#EAEFE7] text-[#35462F] hover:bg-[#DFE8DA]'
                }`}
              >
                {isAutoTouring ? (
                  <>
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop Auto-Tour</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Guided Auto-Tour</span>
                  </>
                )}
              </button>
            </div>

            {/* Saint Story Prose */}
            <div className="mt-5 space-y-3 font-serif text-[18px] leading-[1.68] text-[#221E1A]">
              {narrativeParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Words of the Saint */}
            {currentStop.saintQuote && (
              <blockquote className="mt-5 rounded-r-xl border-l-[3px] border-[#A65B3A] bg-[#F1EADF] px-4 py-3.5 font-serif text-[17px] italic leading-relaxed text-[#2A241E]">
                “{currentStop.saintQuote}”
                <footer className="mt-1.5 not-italic font-sans text-xs font-semibold text-[#655C50]">
                  — {saintTrail.saintName}
                </footer>
              </blockquote>
            )}

            {/* Peaceful Expandable Context Panels (Zero Quiz) */}
            <div className="mt-5 space-y-2.5">
              {currentStop.whatYouCanSeeToday && (
                <details
                  open
                  className="rounded-xl border border-[#E2D8C8] bg-[#F6F2EA] px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F6348]">
                    <Landmark className="h-3.5 w-3.5 shrink-0" />
                    <span>What Pilgrims See Today</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#4E463D]">
                    {currentStop.whatYouCanSeeToday}
                  </p>
                </details>
              )}

              {currentStop.didYouKnowHighlight && (
                <details className="rounded-xl border border-[#E2D8C8] bg-[#F6F2EA] px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A65B3A]">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    <span>Historical Note · Did You Know?</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#4E463D]">
                    {currentStop.didYouKnowHighlight}
                  </p>
                </details>
              )}
            </div>

            {/* Pilgrimage Completion Reflection on Final Stop */}
            {isLastStop && saintTrail.completionSummary && (
              <div className="mt-5 rounded-xl border border-[#C8D4C2] bg-[#EAEFE7] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#4F6348]">
                  Pilgrimage Complete · Reflection
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#2D3829]">
                  {saintTrail.completionSummary}
                </p>
              </div>
            )}

            {/* Simple Previous / Next Stop Controls */}
            <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#E6DDD0] pt-4">
              <button
                type="button"
                onClick={() => goToStopByIndex(activeStopIndex - 1)}
                disabled={activeStopIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCD2C0] bg-[#FCFBF8] px-3.5 py-2.5 text-xs font-semibold text-[#221E1A] transition hover:border-[#4F6348] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Stop</span>
              </button>

              <span className="text-xs font-semibold text-[#655C50]">
                {activeStopIndex + 1} / {trailStops.length}
              </span>

              {isLastStop ? (
                <button
                  type="button"
                  onClick={() => {
                    goToStopByIndex(0);
                    resetRegionalOverview();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#4F6348] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3F5139] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Overview Route</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goToStopByIndex(activeStopIndex + 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#4F6348] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3F5139] cursor-pointer"
                >
                  <span>Next Stop</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
