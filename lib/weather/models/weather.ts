/*
 * MIT No Attribution
 * 
 * Copyright 2024 Peter "Kevin" Contreras
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { CurrentWeather } from "./current-weather";
import { DailyForecast } from "./daily-forecast";
import { HourlyForecast } from "./hourly-forecast";
import { NextHourForecast } from "./next-hour-forecast";
import { WeatherAlertCollection } from "./weather-alert-collection";

/**
 * The collection of all requested weather data.
 */
export interface Weather {
    /**
     * The current weather for the requested location.
     */
    readonly currentWeather?: CurrentWeather;

    /**
     * The daily forecast for the requested location.
     */
    readonly forecastDaily?: DailyForecast;

    /**
     * The hourly forecast for the requested location.
     */
    readonly forecastHourly?: HourlyForecast;

    /**
     * The next hour forecast for the requested location.
     */
    readonly forecastNextHour?: NextHourForecast;

    /**
     * Weather alerts for the requested location.
     */
    readonly weatherAlerts?: WeatherAlertCollection;
}

/**
 * Create a `Weather` object from a given JSON representation.
 * 
 * @param raw A string containing a JSON representation of a `Weather` object.
 * @returns A parsed `Weather` object ready for use.
 */
export function parseWeather(raw: string): Weather {
    const object = JSON.parse(raw, (key, value) => {
        if (typeof value === 'string' && (key === "asOf"
            || key === "moonrise"
            || key === "moonset"
            || key.startsWith("solar")
            || key.startsWith("sunrise")
            || key.startsWith("sunset")
            || key.endsWith("Time")
            || key.endsWith("End")
            || key.endsWith("Start"))) {
            return new Date(value);
        } else {
            return value;
        }
    });
    return object as Weather;
}
