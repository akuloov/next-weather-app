"use client"

import React, {useState} from 'react';
import {MdWbSunny, MdMyLocation, MdOutlineLocationOn} from "react-icons/md";
import SearchBox from "@/app/components/SearchBox";
import axios from "axios";
import {useAtom} from "jotai";
import {loadingCityAtom, placeAtom} from "@/app/atom";
import {SuggestionBox} from "@/app/components/SuggestionBox";

/*type Props = {
    location: string,
}*/

const Navbar = ({location}: { location: string }) => {
  const [city, setCity] = useState("")
  const [error, setError] = useState("")

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [place, setPlace] = useAtom(placeAtom)
  location = place
  const [_, setLoadingCity] = useAtom(loadingCityAtom)

  const handleInputChange = async (value: string) => {
    setCity(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
        const suggestions = response.data.list.map((item: any) => item.name)
        setSuggestions(suggestions)
        setError("")
        setShowSuggestions(true)
      } catch (error) {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value)
    setShowSuggestions(false)
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true)
    e.preventDefault()
    if (suggestions.length === 0) {
      setError("Location not found")
      setLoadingCity(false)
    } else {
      setError("")
      setTimeout(() => {
        setLoadingCity(false)
        setPlace(city)
        setShowSuggestions(false)
      }, 500)
    }
  }

  const handleCurrentLocation = () => {
    setLoadingCity(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
          /*setTimeout(() => {
              setLoadingCity(false)
              setPlace(response.data.name)
          }, 500)*/
          setLoadingCity(false)
          setPlace(response.data.name)
        } catch (error) {
          setLoadingCity(false)
        }
      })
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex items-center px-3 justify-between">
        <div className="items-center justify-center gap-2 hidden md:flex">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300"/>
        </div>
        <section className="w-full flex items-center justify-between md:w-auto md:justify-start">
          <MdMyLocation
            title="Your current location"
            onClick={handleCurrentLocation}
            className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer transition duration-30"
          />
          <div className="flex gap-2 items-center">
            <div className="flex items-center">
              <MdOutlineLocationOn className="text-3xl"/>
              <p className="text-sm text-slate-900/80">{location}</p>
            </div>

            <div className="relative">
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={e => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                showSuggestions={showSuggestions}
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                error={error}
              />
            </div>
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;