"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import HeroCard from "@/components/HeroCard";
import HourlyForecast from "@/components/HourlyForecast";
import FiveDayForecast from "@/components/FiveDayForecast";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherBackground from "@/components/WeatherBackground";
import SkeletonLoader from "@/components/SkeletonLoader";
import { fetchWeather } from "@/lib/weather";
import type { WeatherData, HourlyData, DailyData } from "@/lib/weather";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourly, setHourly] = useState<HourlyData[]>([]);
  const [daily, setDaily] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDay, setIsDay] = useState(true);

  const loadWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data.current);
      setHourly(data.hourly);
      setDaily(data.daily);

      const now = Date.now() / 1000;
      setIsDay(now > data.current.sunrise && now < data.current.sunset);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load weather data");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather("Algiers");
  }, [loadWeather]);

  return (
    <main className="relative min-h-screen min-h-dvh overflow-hidden">
      {/* Dynamic Background */}
      {weather && (
        <WeatherBackground condition={weather.main} isDay={isDay} />
      )}

      {/* Content */}
      <div className="app-container relative z-10 flex flex-col gap-4 sm:gap-5">
        {/* App Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between mb-1 sm:mb-2"
        >
          <h1 className="text-2xl font-serif font-light text-white/80 tracking-wide">
            Skye
          </h1>
          <span className="text-xs font-sans text-white/30">Weather</span>
        </motion.div>

        {/* Search */}
        <SearchBar onSearch={loadWeather} isLoading={loading} />

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass-card px-5 py-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-red-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span className="text-sm font-sans">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weather Data */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonLoader />
            </motion.div>
          ) : weather ? (
            <motion.div
              key="data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4 sm:gap-5"
            >
              {/* Hero */}
              <HeroCard data={weather} />

              {/* Hourly */}
              {hourly.length > 0 && <HourlyForecast data={hourly} />}

              {/* 5-Day + Details side by side on large screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {daily.length > 0 && <FiveDayForecast data={daily} />}
                <WeatherDetails data={weather} />
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-center py-4"
              >
                <p className="text-xs font-sans text-white/20">
                  Powered by OpenWeatherMap
                </p>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
