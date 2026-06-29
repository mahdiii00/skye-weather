"use client";

import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcons";
import type { HourlyData } from "@/lib/weather";

interface HourlyForecastProps {
  data: HourlyData[];
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-4 sm:p-5"
    >
      <h3 className="text-xs font-sans font-medium text-white/40 uppercase tracking-wider mb-3 px-1">
        Hourly Forecast
      </h3>
      <div className="scroll-container flex gap-2 overflow-x-auto pb-1">
        {data.map((hour, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 min-w-[72px] py-3 px-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <span className="text-xs font-sans font-medium text-white/60">
              {i === 0 ? "Now" : hour.time}
            </span>
            <WeatherIcon icon={hour.icon} size={28} />
            <span className="text-sm font-sans font-semibold text-white/90">
              {hour.temperature}°
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
