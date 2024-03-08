import React from 'react';
import Image from "next/image";
import {cn} from "@/utils/cn";

const WeatherIcon = (
    props: React.HTMLProps<HTMLDivElement> & {iconName: string}
) => {
    return (
        <div className={cn('relative h-20 w-20')}>
            <Image
                className="absolute h-full w-full"
                width={100}
                height={100}
                src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
                alt="weather-icon"
            />
        </div>
    );
};

export default WeatherIcon;