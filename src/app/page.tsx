"use client"

import Navbar from "@/app/components/Navbar";
import {useQuery} from "react-query";
import axios from "axios";
import Container from "@/app/components/Container";
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";
import formatDateString from "@/utils/formatDateString";
import WeatherIcon from "@/app/components/WeatherIcon";
import {getDayOrNightIcon} from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/app/components/WeatherDetails";
import {metersToKilometers} from "@/utils/metersToKilometers";
import {format, fromUnixTime, parseISO} from "date-fns";
import {convertWindSpeed} from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/app/components/ForecastWeatherDetail";
import {useAtom} from "jotai";
import {loadingCityAtom, placeAtom} from "@/app/atom";
import {useEffect, useState} from "react";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom)
  const [loadingCity] = useAtom(loadingCityAtom)
  const [firstDataForEachDate, setFirstDataForEachDate] = useState<WeatherDetail[]>([])

  const {isLoading, error, data, refetch} = useQuery<WeatherData>(
    'repoData',
    async () => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
      return data
    }
  )

  useEffect(() => {
    refetch()
  }, [place, refetch])

  const firstData = data?.list[0]

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ]

  useEffect(() => {
    if (!data || !uniqueDates) return;
    const firstDataForEachDate = uniqueDates.map(date =>
      data.list.find(entry =>
        new Date(entry.dt * 1000).toISOString().split("T")[0] === date
      ) ?? false
    ).filter(Boolean) as WeatherDetail[];
    setFirstDataForEachDate(firstDataForEachDate);
  }, [data]);

  if (isLoading) return (
    /*<div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
    </div>*/
    <LoadingSkeleton/>
  )
  console.log(data)
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name || place}/>
      {
        loadingCity ? (<LoadingSkeleton/>) : (
          <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-4 pt-4">
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{formatDateString(firstData?.dt_txt, 'eeee')}</p>
                  <p className="text-lg">({formatDateString(firstData?.dt_txt)})</p>
                </h2>
                <Container className="flex sm:gap-10 px-6 items-center py-10">
                  <div className="flex flex-col pr  -4">
                            <span className="text-5xl">
                                {convertKelvinToCelsius(firstData?.main.temp ?? 236)}°
                            </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span>
                                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                                </span>
                    </p>
                    <p className="text-xs space-x-2">
                                <span>
                                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                                </span>
                      <span>
                                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                                </span>
                    </p>
                  </div>
                  <div
                    className="items-center flex overflow-x-auto sm:gap-10 justify-between pr-3">
                    {data?.list.map((data, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {formatDateString(data.dt_txt, "h:mm a")}
                        </p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(data.weather[0].icon, data.dt_txt)}/>
                        <p>{convertKelvinToCelsius(data?.main.temp ?? 0)}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-4">
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="text-center capitalize">{firstData?.weather[0].description}</p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? "", firstData?.dt_txt ?? place)}/>
                </Container>
                <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visability={metersToKilometers(firstData?.visibility ?? 10000)}
                    airPressure={`${firstData?.main.pressure} hPa`}
                    humidity={`${firstData?.main.humidity}%`}
                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 1710206112), 'H.mm')}
                    sunset={format(fromUnixTime(data?.city.sunset ?? 1710206112), 'H.mm')}
                    windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                  />
                </Container>
              </div>
            </section>
            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forecast (7 days)</p>
              {firstDataForEachDate.map((d, index) => (
                <ForecastWeatherDetail
                  key={index}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  date={!isNaN(Date.parse(d?.dt_txt ?? "")) ? format(parseISO(d?.dt_txt ?? ""), "dd.MM") : ""}
                  day={!isNaN(Date.parse(d?.dt_txt ?? "")) ? format(parseISO(d?.dt_txt ?? ""), "EEEE") : ""}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  airPressure={`${d?.main.pressure} hPa`}
                  humidity={`${d?.main.humidity}%`}
                  sunrise={format(fromUnixTime(data?.city.sunrise ?? 1710206112), "H:mm")}
                  sunset={format(fromUnixTime(data?.city.sunset ?? 1710206112), "H:mm")}
                  visability={`${metersToKilometers(d?.visibility ?? 10000)}`}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)}`}
                />
              ))}
            </section>
          </main>
        )
      }
    </div>
  );
}