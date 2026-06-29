# 🌤️ Skye Weather

A premium glassmorphism weather app with real-time data and dynamic backgrounds. Designed as a portfolio piece — every detail tuned for a polished, human-crafted feel.

## 🌐 Live Demo

[View Live Site](https://skye-weather-vert.vercel.app)

## ✨ Features

- **Glassmorphism UI** — layered frosted glass cards with deep blur, subtle borders, and micro-interactions
- **Dynamic backgrounds** — scene changes based on weather: warm gradients (sunny), dark slate with rain animation (rainy), muted purple (cloudy), deep navy with twinkling stars (night), cold blue with snowfall (snowy)
- **Real-time weather** — live data from OpenWeatherMap API (current conditions + 5-day forecast + 3-hour intervals)
- **Hourly forecast** — horizontal scrollable strip of 8 cards with time, icon, and temperature
- **5-day forecast** — clean list with day, icon, condition, high/low
- **Weather details grid** — 2x2 cards for humidity, wind speed, visibility, UV index with animated fill bars
- **Search with recent history** — glassmorphism input, localStorage for recent searches, animated dropdown
- **Loading skeletons** — shimmer placeholders for every section while data loads
- **Custom animated SVG icons** — 9 hand-crafted weather icons (no external icon libraries)
- **Fully responsive** — mobile-first, adapts from phone to desktop

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) (App Router) | Framework |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [OpenWeatherMap API](https://openweathermap.org/api) | Weather data |
| [Google Fonts](https://fonts.google.com/) (Cormorant Garamond + Inter) | Typography |
| [Vercel](https://vercel.com/) | Deployment |

## 🚀 Getting Started

```bash
git clone https://github.com/mahdiii00/skye-weather
cd skye-weather
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔑 API Key

The app uses mock data by default. To enable live weather:

1. Get a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Open `lib/weather.ts` and replace the placeholder:

```ts
const API_KEY: string = "your_api_key_here";
```

3. The app falls back to realistic mock data when the key is set to the placeholder, so it always looks good.

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Glassmorphism styles, rain/snow/stars animations
│   ├── layout.tsx           # Fonts, metadata
│   └── page.tsx             # Main app — state, data fetching, layout
├── components/
│   ├── SearchBar.tsx        # Glass input + recent searches dropdown
│   ├── HeroCard.tsx         # City, temperature, condition, pills
│   ├── HourlyForecast.tsx   # Horizontal scrollable hourly strip
│   ├── FiveDayForecast.tsx  # 5-day forecast list
│   ├── WeatherDetails.tsx   # 2×2 humidity, wind, visibility, UV
│   ├── WeatherBackground.tsx# Dynamic gradient + particle animations
│   ├── WeatherIcons.tsx     # 9 custom animated SVG icons
│   └── SkeletonLoader.tsx   # Loading skeletons
└── lib/
    └── weather.ts           # API calls + mock data fallback
```

## 🧑‍🎨 Design Notes

- **Typography**: Cormorant Garamond (serif) for temperature display, Inter (sans-serif) for UI — a deliberate contrast that feels editorial and premium
- **Glassmorphism**: Backdrop blur between 8px–24px, subtle white borders at 10–18% opacity, hover states that deepen the glass
- **Animations**: All transitions use Framer Motion with custom cubic-bezier curves for buttery motion
- **Mobile-first**: Layout stacks vertically on small screens, with a max-width container on desktop

## 📄 License

MIT

---

Built by [Mahdi Slimani](https://mahdi-portfolio-six.vercel.app)
