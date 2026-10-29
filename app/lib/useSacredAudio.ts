"use client";
import { useEffect, useRef, useState } from "react";
import { createSpeechBlob } from "./clientSpeech";

export function useSacredAudio() {
  const [isPlaying, setPlaying] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const audio = useRef<HTMLAudioElement | null>(null);
  const music = useRef<HTMLAudioElement | null>(null);
  const url = useRef<string | null>(null);
  const request = useRef(0);
  const active = useRef(true);
  const stop = () => {
    request.current++;
    audio.current?.pause();
    music.current?.pause();
    audio.current = null;
    music.current = null;
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    setPlaying(false);
    setLoading(false);
  };
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      request.current++;
      audio.current?.pause();
      music.current?.pause();
      if (url.current) URL.revokeObjectURL(url.current);
    };
  }, []);
  const play = async (
    text: string,
    voice: string,
    rate = 1,
    withMusic = false,
  ) => {
    if (!active.current) return;
    stop();
    const current = request.current;
    setError("");
    setLoading(true);
    try {
      const blob = await createSpeechBlob(text, voice, rate);
      if (current !== request.current) return;
      url.current = URL.createObjectURL(blob);
      const element = new Audio(url.current);
      audio.current = element;
      element.onended = () => {
        if (current === request.current) stop();
      };
      element.onerror = () => {
        if (current !== request.current) return;
        stop();
        setError("This audio could not play. Please try again.");
      };
      await element.play();
      if (current !== request.current) {
        element.pause();
        return;
      }
      setPlaying(true);
      setLoading(false);
      if (withMusic) {
        const background = new Audio("/audio/background/contemplative-1.mp3");
        background.volume = 0.12;
        background.loop = true;
        music.current = background;
        background.play().catch(() => {
          if (current === request.current)
            setError(
              "The reflection is playing, but background music is unavailable.",
            );
        });
      }
    } catch (problem) {
      if (current !== request.current) return;
      stop();
      setError(
        problem instanceof Error
          ? problem.message
          : "Audio could not start. Please try again.",
      );
    }
  };
  return { play, stop, isPlaying, isLoading, error };
}
