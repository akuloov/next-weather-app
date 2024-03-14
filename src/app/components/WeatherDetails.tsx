import React from 'react';
import {LuEye, LuSunrise, LuSunset} from "react-icons/lu";
import {FiDroplet} from "react-icons/fi";
import {MdAir} from "react-icons/md";
import {ImMeter} from "react-icons/im";

export interface SingleWeatherDetailProps {
    information: string,
    icon: React.ReactNode,
    value: string
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}

export interface WeatherDetailProps {
    visability: string,
    humidity: string,
    windSpeed: string,
    airPressure: string,
    sunrise: string,
    sunset: string
}

export default function WeatherDetails(props: WeatherDetailProps) {

    return <>
        <SingleWeatherDetail
            information="Visability"
            icon={<LuEye/>}
            value={props.visability}
        />
        <SingleWeatherDetail
            information="Humidity"
            icon={<FiDroplet/>}
            value={props.humidity}
        />
        <SingleWeatherDetail
            information="Wind speed"
            icon={<MdAir/>}
            value={props.windSpeed}
        />
        <SingleWeatherDetail
            information="Air pressure"
            icon={<ImMeter/>}
            value={props.airPressure}
        />
        <SingleWeatherDetail
            information="Sunrise"
            icon={<LuSunrise/>}
            value={props.sunrise}
        />
        <SingleWeatherDetail
            information="Sunset"
            icon={<LuSunset/>}
            value={props.sunset}
        />
    </>
};