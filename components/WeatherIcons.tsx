"use client";

import { motion } from "framer-motion";

interface IconProps {
  size?: number;
  className?: string;
}

function Sun({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <motion.circle
        cx="50" cy="50" r="18"
        fill="#FBBF24"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 24 * Math.cos(rad);
        const y1 = 50 + 24 * Math.sin(rad);
        const x2 = 50 + 34 * Math.cos(rad);
        const y2 = 50 + 34 * Math.sin(rad);
        return (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        );
      })}
    </svg>
  );
}

function Moon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <motion.circle
        cx="55" cy="45" r="22"
        fill="#FDE68A"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="45" cy="40" r="22" fill="rgba(15,23,42,0.6)" />
      {[...Array(5)].map((_, i) => (
        <circle
          key={i}
          cx={35 + Math.random() * 30}
          cy={30 + Math.random() * 30}
          r={0.8}
          fill="#FDE68A"
          opacity={0.4 + Math.random() * 0.4}
        />
      ))}
    </svg>
  );
}

function Cloud({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <motion.g
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="50" cy="58" rx="30" ry="16" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="35" cy="50" rx="16" ry="14" fill="rgba(255,255,255,0.5)" />
        <ellipse cx="65" cy="52" rx="14" ry="12" fill="rgba(255,255,255,0.5)" />
        <ellipse cx="50" cy="42" rx="12" ry="10" fill="rgba(255,255,255,0.45)" />
      </motion.g>
    </svg>
  );
}

function CloudSun({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <motion.circle
        cx="35" cy="35" r="12"
        fill="#FBBF24"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 35 + 16 * Math.cos(rad);
        const y1 = 35 + 16 * Math.sin(rad);
        const x2 = 35 + 22 * Math.cos(rad);
        const y2 = 35 + 22 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#FBBF24"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.6}
          />
        );
      })}
      <motion.g
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="55" cy="58" rx="24" ry="14" fill="rgba(255,255,255,0.55)" />
        <ellipse cx="42" cy="52" rx="14" ry="12" fill="rgba(255,255,255,0.45)" />
        <ellipse cx="68" cy="53" rx="12" ry="10" fill="rgba(255,255,255,0.45)" />
        <ellipse cx="55" cy="44" rx="10" ry="8" fill="rgba(255,255,255,0.4)" />
      </motion.g>
    </svg>
  );
}

function CloudMoon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <motion.circle
        cx="40" cy="35" r="14"
        fill="#FDE68A"
        animate={{ opacity: [0.75, 0.95, 0.75] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="32" cy="32" r="14" fill="rgba(15,23,42,0.5)" />
      <motion.g
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="58" cy="60" rx="24" ry="14" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="45" cy="54" rx="14" ry="12" fill="rgba(255,255,255,0.35)" />
        <ellipse cx="70" cy="55" rx="12" ry="10" fill="rgba(255,255,255,0.35)" />
      </motion.g>
    </svg>
  );
}

function Rain({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <ellipse cx="50" cy="40" rx="28" ry="14" fill="rgba(180,180,190,0.6)" />
      <ellipse cx="35" cy="34" rx="15" ry="12" fill="rgba(160,160,170,0.5)" />
      <ellipse cx="65" cy="36" rx="13" ry="10" fill="rgba(160,160,170,0.5)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1={30 + i * 10}
          y1={56 + (i % 2) * 3}
          x2={28 + i * 10}
          y2={68 + (i % 2) * 3}
          stroke="rgba(180,200,255,0.5)"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={{ y: [0, 4, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

function Snow({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <ellipse cx="50" cy="38" rx="28" ry="14" fill="rgba(220,225,235,0.5)" />
      <ellipse cx="35" cy="32" rx="15" ry="12" fill="rgba(200,205,215,0.4)" />
      <ellipse cx="65" cy="34" rx="13" ry="10" fill="rgba(200,205,215,0.4)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.circle
          key={i}
          cx={28 + i * 8}
          cy={60 + (i % 3) * 4}
          r="2.5"
          fill="white"
          opacity={0.7}
          animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function Thunderstorm({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <ellipse cx="50" cy="32" rx="28" ry="14" fill="rgba(100,100,120,0.6)" />
      <ellipse cx="35" cy="26" rx="15" ry="12" fill="rgba(90,90,110,0.5)" />
      <ellipse cx="65" cy="28" rx="13" ry="10" fill="rgba(90,90,110,0.5)" />
      <motion.polygon
        points="48,44 42,60 50,58 46,76 58,52 50,54 55,44"
        fill="#FBBF24"
        animate={{ opacity: [0.6, 1, 0.4, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={32 + i * 14}
          y1={50 + i * 2}
          x2={30 + i * 14}
          y2={62 + i * 2}
          stroke="rgba(180,200,255,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ y: [0, 3, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.7 + i * 0.1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function Mist({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {[0, 1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1="20" y1={35 + i * 10}
          x2="80" y2={35 + i * 10}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 3 + i * 2, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </svg>
  );
}

interface WeatherIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export default function WeatherIcon({ icon, size = 48, className }: WeatherIconProps) {
  const code = icon?.replace(/[dn]$/, "") || "01";
  const isNight = icon?.endsWith("n");

  switch (code) {
    case "01":
      return isNight ? <Moon size={size} className={className} /> : <Sun size={size} className={className} />;
    case "02":
      return isNight ? <CloudMoon size={size} className={className} /> : <CloudSun size={size} className={className} />;
    case "03":
    case "04":
      return <Cloud size={size} className={className} />;
    case "09":
    case "10":
      return <Rain size={size} className={className} />;
    case "11":
      return <Thunderstorm size={size} className={className} />;
    case "13":
      return <Snow size={size} className={className} />;
    case "50":
      return <Mist size={size} className={className} />;
    default:
      return isNight ? <Moon size={size} className={className} /> : <Sun size={size} className={className} />;
  }
}
