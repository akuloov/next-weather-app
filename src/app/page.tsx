"use client"

import Navbar from "@/app/components/Navbar";
import {useQuery} from "react-query";
import axios from "axios";
import Container from "@/app/components/Container";
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";
import formatDateString from "@/utils/formatDateString";
import WeatherIcon from "@/app/components/WeatherIcon";
import {getDayOrNightIcon} from "@/utils/getDayOrNightIcon";

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
    const {isLoading, error, data} = useQuery<WeatherData>(
        'repoData',
        async () => {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
            return data
        }
    )
    const firstData = data?.list[0]
    console.log(data?.list)

    if (isLoading) return (
        <div className="flex items-center min-h-screen justify-center">
            <p className="animate-bounce">Loading...</p>
        </div>
    )

    return (
        <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
            <Navbar/>
            <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
                <section className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="flex gap-1 text-2xl items-end">
                            <p>{formatDateString(firstData?.dt_txt, 'eeee')}</p>
                            <p className="text-lg">({formatDateString(firstData?.dt_txt)})</p>
                        </h2>
                        <Container className="flex gap-10 px-6 items-center py-10">
                            <div className="flex flex-col px-4">
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
                            <div className="items-center flex overflow-x-auto  gap-10 sm:gap-16  justify-between pr-3">
                                {data?.list.map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                                    >
                                        <p className="whitespace-nowrap">
                                            {formatDateString(data.dt_txt, "h:mm a")}
                                        </p>
                                        <WeatherIcon iconName={getDayOrNightIcon(data.weather[0].icon, data.dt_txt)}/>
                                        <p>{convertKelvinToCelsius(data?.main.temp ?? 0)}°</p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </div>
                    <div className="flex gap-4">

                    </div>
                </section>
                <section className="flex w-full flex-col gap-4">
                    <p className="text-2xl">Forecast (7 days)</p>
                </section>
            </main>
        </div>
    );
}