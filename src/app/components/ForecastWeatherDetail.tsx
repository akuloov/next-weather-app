import React from 'react';
import Container from "@/app/components/Container";
import WeatherIcon from "@/app/components/WeatherIcon";
import WeatherDetails, {WeatherDetailProps} from "@/app/components/WeatherDetails";
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
    weatherIcon: string,
    date: string,
    day: string,
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    description: string
}

const ForecastWeatherDetail = (props: ForecastWeatherDetailProps) => {
    const {
        weatherIcon = "02d",
        date = "19.09",
        day = "Tuesday",
        temp,
        feels_like,
        temp_min,
        temp_max,
        description
    } = props

    return (
        <Container className="gap-4">
            <section className="flex gap-4 items-center px-4">
                <div className="flex flex-col items-center mb-6">
                    <WeatherIcon iconName={weatherIcon}/>
                    <p>{date}</p>
                    <p className="text-sm">{day}</p>
                </div>
                <div className="flex flex-col px-4">
                    <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°</span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                        <span>Feels like</span>
                        <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
                    </p>
                    <p>{description}</p>
                </div>
            </section>
            <section className="flex overflow-x-auto justify-between gap-4 px-4 w-full pr-10">
                <WeatherDetails {...props}/>
            </section>
        </Container>
    );
};

export default ForecastWeatherDetail;