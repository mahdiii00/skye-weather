"use client";

import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcons";
import type { WeatherData } from "@/lib/weather";

interface HeroCardProps {
  data: WeatherData;
}

export default function HeroCard({ data }: HeroCardProps) {
  const lastUpdated = new Date(data.dt * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-card px-6 py-8 sm:px-8 sm:py-10 text-center relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* City name */}
        <motion.div
          custom={0}
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-1"
        >
          <h1 className="text-xl sm:text-2xl font-medium text-white/90 font-sans">
            {data.city}
          </h1>
          <span className="text-sm px-2 py-0.5 rounded-md bg-white/10 text-white/60 font-sans">
            {data.country}
          </span>
        </motion.div>

        {/* Weather icon */}
        <motion.div
          custom={1}
          variants={itemVariants}
          className="flex justify-center my-3"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <WeatherIcon icon={data.icon} size={80} />
          </motion.div>
        </motion.div>

        {/* Temperature */}
        <motion.div
          custom={2}
          variants={itemVariants}
          className="relative"
        >
          <span className="font-serif text-8xl sm:text-9xl font-light text-white temp-glow leading-none block">
            {data.temperature}°
          </span>
        </motion.div>

        {/* Condition */}
        <motion.div
          custom={3}
          variants={itemVariants}
          className="mt-2"
        >
          <p className="text-lg sm:text-xl font-sans font-light text-white/80 capitalize">
            {data.description}
          </p>
        </motion.div>

        {/* Feels like */}
        <motion.div
          custom={4}
          variants={itemVariants}
          className="mt-1"
        >
          <p className="text-sm font-sans text-white/50">
            Feels like {data.feelsLike}°
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          custom={5}
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 mt-5"
        >
          <span className="weather-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            {data.humidity}%
          </span>
          <span className="weather-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
            {data.windSpeed} km/h
          </span>
        </motion.div>

        {/* Updated time */}
        <motion.div
          custom={6}
          variants={itemVariants}
          className="mt-5"
        >
          <p className="text-xs font-sans text-white/30">
            Last updated {lastUpdated}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
