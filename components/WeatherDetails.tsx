"use client";

import { motion } from "framer-motion";
import type { WeatherData } from "@/lib/weather";

interface DetailCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  fill?: number;
  delay?: number;
}

function DetailCard({ label, value, icon, fill = 0, delay = 0 }: DetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-4 sm:p-5 flex flex-col gap-2"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans font-medium text-white/40 uppercase tracking-wider">
          {label}
        </span>
        <div className="text-white/40">{icon}</div>
      </div>
      <span className="text-xl sm:text-2xl font-sans font-semibold text-white">
        {value}
      </span>
      {fill > 0 && (
        <div className="fill-bar mt-1">
          <motion.div
            className="fill-bar-inner"
            initial={{ width: 0 }}
            animate={{ width: `${fill}%` }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
    </motion.div>
  );
}

interface WeatherDetailsProps {
  data: WeatherData;
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const visKm = (data.visibility / 1000).toFixed(1);
  const uvPercent = Math.min((data.uvIndex / 11) * 100, 100);

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <DetailCard
        label="Humidity"
        value={`${data.humidity}%`}
        fill={data.humidity}
        delay={0.4}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        }
      />
      <DetailCard
        label="Wind Speed"
        value={`${data.windSpeed} km/h`}
        delay={0.45}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
          </svg>
        }
      />
      <DetailCard
        label="Visibility"
        value={`${visKm} km`}
        fill={Math.min((data.visibility / 10000) * 100, 100)}
        delay={0.5}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      />
      <DetailCard
        label="UV Index"
        value={`${data.uvIndex}`}
        fill={uvPercent}
        delay={0.55}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        }
      />
    </div>
  );
}
