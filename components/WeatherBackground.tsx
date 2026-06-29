"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

type WeatherCondition = "clear" | "clouds" | "rain" | "snow" | "thunderstorm" | "night";

interface WeatherBackgroundProps {
  condition: string;
  isDay: boolean;
}

export default function WeatherBackground({ condition, isDay }: WeatherBackgroundProps) {
  const resolved: WeatherCondition = useMemo(() => {
    if (!isDay) return "night";
    if (condition === "thunderstorm") return "thunderstorm";
    if (condition === "rain" || condition === "drizzle") return "rain";
    if (condition === "snow") return "snow";
    if (condition === "clouds" || condition === "atmosphere") return "clouds";
    return "clear";
  }, [condition, isDay]);

  const gradient = useMemo(() => {
    switch (resolved) {
      case "clear":
        return "linear-gradient(135deg, #F59E0B 0%, #F97316 30%, #EF4444 60%, #7C2D12 100%)";
      case "clouds":
        return "linear-gradient(135deg, #4C1D95 0%, #6B21A8 25%, #7E22CE 50%, #475569 80%, #334155 100%)";
      case "rain":
        return "linear-gradient(135deg, #1E293B 0%, #334155 30%, #475569 60%, #0F172A 100%)";
      case "snow":
        return "linear-gradient(135deg, #0F172A 0%, #1E293B 30%, #475569 60%, #94A3B8 100%)";
      case "thunderstorm":
        return "linear-gradient(135deg, #0F0F23 0%, #1A1A3E 30%, #2D1B4E 60%, #1E1B4B 100%)";
      case "night":
        return "linear-gradient(135deg, #020617 0%, #0F172A 25%, #1E1B4B 50%, #0F172A 75%, #020617 100%)";
      default:
        return "linear-gradient(135deg, #F59E0B 0%, #F97316 30%, #EF4444 60%, #7C2D12 100%)";
    }
  }, [resolved]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={resolved}
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: gradient }}
        />

        {/* Subtle radial overlay for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Rain drops */}
        {resolved === "rain" && <RainEffect />}

        {/* Snowflakes */}
        {resolved === "snow" && <SnowEffect />}

        {/* Stars */}
        {resolved === "night" && <StarsEffect />}
      </motion.div>
    </AnimatePresence>
  );
}

function RainEffect() {
  return (
    <div className="rain-container" aria-hidden="true">
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${8 + Math.random() * 20}px`,
            animationDuration: `${0.5 + Math.random() * 0.8}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function SnowEffect() {
  return (
    <div className="snow-container" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function StarsEffect() {
  return (
    <div className="stars-container" aria-hidden="true">
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            animationDuration: `${2 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
