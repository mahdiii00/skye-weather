import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.15)",
          medium: "rgba(255, 255, 255, 0.25)",
          heavy: "rgba(255, 255, 255, 0.35)",
          border: "rgba(255, 255, 255, 0.18)",
        },
        weather: {
          sunny: "#F59E0B",
          warm: "#EF4444",
          cool: "#3B82F6",
          night: "#1E1B4B",
          rainy: "#475569",
          cloudy: "#6B21A8",
          snowy: "#E0F2FE",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "rain": "rain 1s linear infinite",
        "snow": "snow 3s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rain: {
          "0%": { transform: "translateY(-10px) translateX(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100vh) translateX(-20px)", opacity: "0" },
        },
        snow: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
