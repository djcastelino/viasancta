"use client";
import { useEffect, useState } from "react";
import { dailyChallengeIndex, watchLocalDay } from "./localCalendar";

export interface DailyArchitecture {
  name: string;
  location: { city: string; country: string };
  images?: { url: string }[];
}

export function architectureHeroImage(church: DailyArchitecture) {
  const image = church.images?.[0]?.url;
  return image?.startsWith("/images/architecture/")
    ? image.replace(/\.png$/, ".webp")
    : image || "/images/home/architecture.webp";
}

/** Shared by the homepage hero and the Sacred Architecture page. */
export function useDailyArchitecture<T extends DailyArchitecture>(churches: T[]): T | null {
  const [day, setDay] = useState("");
  useEffect(() => watchLocalDay(setDay), []);
  if (!day || !churches.length) return null;
  const date = new Date(`${day}T12:00:00`);
  const index = (dailyChallengeIndex(churches.length, date) + churches.length - 1) % churches.length;
  return churches[index];
}
