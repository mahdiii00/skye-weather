"use client";

import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcons";
import type { DailyData } from "@/lib/weather";

interface FiveDayForecastProps {
  data: DailyData[];
}

export default function FiveDayForecast({ data }: FiveDayForecastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-4 sm:p-5"
    >
      <h3 className="text-xs font-sans font-medium text-white/40 uppercase tracking-wider mb-2 px-1">
        5-Day Forecast
      </h3>
      <div className="divide-y divide-white/5">
        {data.map((day, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.06, duration: 0.4, ease: "easeOut" }}
            className="flex items-center py-3 px-1 hover:bg-white/5 rounded-xl transition-colors -mx-1 px-2"
          >
            <span className="w-12 text-sm font-sans font-medium text-white/80">
              {day.day}
            </span>
            <div className="flex items-center justify-center w-10">
              <WeatherIcon icon={day.icon} size={24} />
            </div>
            <span className="flex-1 text-xs font-sans text-white/50 capitalize truncate ml-2">
              {day.condition}
            </span>
            <div className="flex items-center gap-3 text-sm font-sans font-medium">
              <span className="text-white/90">{day.high}°</span>
              <span className="text-white/30">{day.low}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
