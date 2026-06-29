const API_KEY: string = "6d283ae66bb075d96124cf8056afdf29";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  dt: number;
  main: string;
}

export interface HourlyData {
  time: string;
  temperature: number;
  icon: string;
  condition: string;
}

export interface DailyData {
  day: string;
  icon: string;
  condition: string;
  high: number;
  low: number;
}

export interface WeatherError {
  message: string;
}

function getWeatherCondition(id: number): string {
  if (id >= 200 && id < 300) return "thunderstorm";
  if (id >= 300 && id < 400) return "drizzle";
  if (id >= 500 && id < 600) return "rain";
  if (id >= 600 && id < 700) return "snow";
  if (id >= 700 && id < 800) return "atmosphere";
  if (id === 800) return "clear";
  if (id >= 801 && id < 810) return "clouds";
  return "unknown";
}

function getTimeFromDt(dt: number, timezoneOffset: number): string {
  const date = new Date((dt + timezoneOffset) * 1000);
  const hours = date.getUTCHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h} ${ampm}`;
}

function getDayFromDt(dt: number, timezoneOffset: number): string {
  const date = new Date((dt + timezoneOffset) * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getUTCDay()];
}

export async function fetchWeather(city: string): Promise<{
  current: WeatherData;
  hourly: HourlyData[];
  daily: DailyData[];
}> {
  if (API_KEY === "YOUR_API_KEY") {
    return getMockWeatherData(city);
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      ),
      fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      ),
    ]);

    if (!currentRes.ok) {
      if (currentRes.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      if (currentRes.status === 401) {
        throw new Error("Invalid API key. Please set a valid OpenWeatherMap API key in lib/weather.ts");
      }
      throw new Error("Failed to fetch weather data");
    }

    if (!forecastRes.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const timezoneOffset = currentData.timezone;

    const current: WeatherData = {
      city: currentData.name,
      country: currentData.sys.country,
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      condition: currentData.weather[0].main,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6),
      visibility: currentData.visibility,
      uvIndex: 0,
      pressure: currentData.main.pressure,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
      dt: currentData.dt,
      main: getWeatherCondition(currentData.weather[0].id),
    };

    interface ForecastItem {
      dt: number;
      main: { temp: number; temp_max: number; temp_min: number };
      weather: { id: number; main: string; icon: string; description: string }[];
    }

    const hourly: HourlyData[] = forecastData.list
      .slice(0, 8)
      .map((item: ForecastItem) => ({
        time: getTimeFromDt(item.dt, timezoneOffset),
        temperature: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        condition: item.weather[0].main,
      }));

    const dailyMap = new Map<string, DailyData>();
    forecastData.list.forEach((item: ForecastItem) => {
      const day = getDayFromDt(item.dt, timezoneOffset);
      if (!dailyMap.has(day)) {
        dailyMap.set(day, {
          day,
          icon: item.weather[0].icon,
          condition: item.weather[0].main,
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
        });
      } else {
        const existing = dailyMap.get(day)!;
        existing.high = Math.max(existing.high, Math.round(item.main.temp_max));
        existing.low = Math.min(existing.low, Math.round(item.main.temp_min));
      }
    });

    const daily = Array.from(dailyMap.values()).slice(0, 5);

    return { current, hourly, daily };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

function getMockWeatherData(city: string) {
  const conditions = ["Clear", "Clouds", "Rain", "Snow", "Thunderstorm"];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = condition === "Snow" ? -2 : condition === "Rain" ? 12 : condition === "Thunderstorm" ? 28 : 24;

  return {
    current: {
      city,
      country: "US",
      temperature: temp,
      feelsLike: temp - 2,
      condition: condition,
      description: condition === "Clear" ? "Clear sky" : condition === "Clouds" ? "Overcast clouds" : condition === "Rain" ? "Moderate rain" : condition === "Snow" ? "Light snow" : "Thunderstorm",
      icon: condition === "Clear" ? "01d" : condition === "Clouds" ? "04d" : condition === "Rain" ? "10d" : condition === "Snow" ? "13d" : "11d",
      humidity: 65,
      windSpeed: 12,
      visibility: 10000,
      uvIndex: 5,
      pressure: 1013,
      sunrise: Math.floor(Date.now() / 1000) - 21600,
      sunset: Math.floor(Date.now() / 1000) + 21600,
      dt: Math.floor(Date.now() / 1000),
      main: condition === "Clear" ? "clear" : condition === "Clouds" ? "clouds" : condition === "Rain" ? "rain" : condition === "Snow" ? "snow" : "thunderstorm",
    },
    hourly: Array.from({ length: 8 }, (_, i) => ({
      time: i === 0 ? "Now" : `${i * 3 === 3 ? 3 : i * 3 === 6 ? 6 : i * 3 === 9 ? 9 : i * 3 === 12 ? 12 : i * 3 === 15 ? 3 : i * 3 === 18 ? 6 : i * 3 === 21 ? 9 : i * 3} ${i * 3 >= 12 ? "PM" : "AM"}`.replace("0 AM", "12 AM"),
      temperature: temp + (i % 3 === 0 ? 2 : i % 3 === 1 ? -1 : 0),
      icon: condition === "Clear" ? "01d" : condition === "Clouds" ? "04d" : condition === "Rain" ? "10d" : condition === "Snow" ? "13d" : "11d",
      condition: condition,
    })),
    daily: [
      { day: "Mon", icon: condition === "Clear" ? "01d" : "02d", condition: condition, high: temp + 3, low: temp - 4 },
      { day: "Tue", icon: "02d", condition: "Partly Cloudy", high: temp + 1, low: temp - 2 },
      { day: "Wed", icon: "10d", condition: "Rain", high: temp - 3, low: temp - 6 },
      { day: "Thu", icon: "03d", condition: "Cloudy", high: temp - 1, low: temp - 3 },
      { day: "Fri", icon: "01d", condition: "Clear", high: temp + 4, low: temp - 1 },
    ],
  };
}
