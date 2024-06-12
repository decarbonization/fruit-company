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

import { MoonPhase, PrecipitationType, ProductData, WeatherCondition } from "./base";

/**
 * The daily forecast information.
 */
export interface DailyForecast extends ProductData {
    /**
     * An array of the day forecast weather conditions.
     */
    readonly days: DayWeatherConditions[];

    /**
     * A URL that provides more information about the forecast.
     */
    readonly learnMoreURL: string;
}

/**
 * The historical or forecasted weather conditions for a specified day.
 */
export interface DayWeatherConditions {
    /**
     * An enumeration value indicating the condition at the time.
     */
    readonly conditionCode: WeatherCondition;

    /**
     * The forecast between 7 AM and 7 PM for the day.
     */
    readonly daytimeForecast?: DayPartForecast;

    /**
     * The ending date and time of the day.
     */
    readonly forecastEnd: Date;

    /**
     * The starting date and time of the day.
     */
    readonly forecastStart: Date;

    /**
     * The maximum ultraviolet index value during the day.
     */
    readonly maxUvIndex: number;

    /**
     * The phase of the moon on the specified day.
     */
    readonly moonPhase: MoonPhase;

    /**
     * The time of moonrise on the specified day.
     */
    readonly moonrise?: Date;

    /**
     * The time of moonset on the specified day.
     */
    readonly moonset?: Date;

    /**
     * The day part forecast between 7 PM and 7 AM for the overnight.
     */
    readonly overnightForecast?: DayPartForecast;

    /**
     * The amount of precipitation forecasted to occur during the day, in millimeters.
     */
    readonly precipitationAmount: number;

    /**
     * The chance of precipitation forecasted to occur during the day.
     */
    readonly precipitationChance: number;

    /**
     * The type of precipitation forecasted to occur during the day.
     */
    readonly precipitationType: PrecipitationType;

    /**
     * The depth of snow as ice crystals forecasted to occur during the day, in millimeters.
     */
    readonly snowfallAmount: number;

    /**
     * The time when the sun is lowest in the sky.
     */
    readonly solarMidnight?: Date;

    /**
     * The time when the sun is highest in the sky.
     */
    readonly solarNoon?: Date;

    /**
     * The time when the top edge of the sun reaches the horizon in the morning.
     */
    readonly sunrise?: Date;

    /**
     * The time when the sun is 18 degrees below the horizon in the morning.
     */
    readonly sunriseAstronomical?: Date;

    /**
     * The time when the sun is 6 degrees below the horizon in the morning.
     */
    readonly sunriseCivil?: Date;

    /**
     * The time when the sun is 12 degrees below the horizon in the morning.
     */
    readonly sunriseNautical?: Date;

    /**
     * The time when the top edge of the sun reaches the horizon in the evening.
     */
    readonly sunset?: Date;

    /**
     * The time when the sun is 18 degrees below the horizon in the evening.
     */
    readonly sunsetAstronomical?: Date;

    /**
     * The time when the sun is 6 degrees below the horizon in the evening.
     */
    readonly sunsetCivil?: Date;

    /**
     * The time when the sun is 12 degrees below the horizon in the evening.
     */
    readonly sunsetNautical?: Date;

    /**
     * The maximum temperature forecasted to occur during the day, in degrees Celsius.
     */
    readonly temperatureMax: number;

    /**
     * The minimum temperature forecasted to occur during the day, in degrees Celsius.
     */
    readonly temperatureMin: number;

    /**
     * The maximum wind gust speed forecasted to occur during the day, in kilometers per hour.
     */
    readonly windGustSpeedMax?: number;

    /**
     * The average wind speed forecasted to occur during the day, in kilometers per hour.
     */
    readonly windSpeedAvg?: number;

    /**
     * The maximum wind speed forecasted to occur during the day, in kilometers per hour.
     */
    readonly windSpeedMax?: number;
}

/**
 * A summary forecast for a daytime or overnight period.
 */
export interface DayPartForecast {
    /**
     * The percentage of the sky covered with clouds during the period, from 0 to 1.
     */
    readonly cloudCover: number;

    /**
     * An enumeration value indicating the condition at the time.
     */
    readonly conditionCode: WeatherCondition;

    /**
     * The ending date and time of the forecast.
     */
    readonly forecastEnd: Date;

    /**
     * The starting date and time of the forecast.
     */
    readonly forecastStart: Date;

    /**
     * The relative humidity during the period, from 0 to 1.
     */
    readonly humidity: number;

    /**
     * The amount of precipitation forecasted to occur during the period, in millimeters.
     */
    readonly precipitationAmount: number;

    /**
     * The chance of precipitation forecasted to occur during the period.
     */
    readonly precipitationChance: number;

    /**
     * The type of precipitation forecasted to occur during the period.
     */
    readonly precipitationType: PrecipitationType;

    /**
     * The depth of snow as ice crystals forecasted to occur during the period, in millimeters.
     */
    readonly snowfallAmount: number;

    /**
     * The direction the wind is forecasted to come from during the period, in degrees.
     */
    readonly windDirection?: number;

    /**
     * The average speed the wind is forecasted to be during the period, in kilometers per hour.
     */
    readonly windSpeed: number;

    /**
     * The maximum wind gust speed forecasted to occur during the period, in kilometers per hour.
     */
    readonly windGustSpeedMax?: number;

    /**
     * The average wind speed forecasted to occur during the period, in kilometers per hour.
     */
    readonly windSpeedAvg?: number;

    /**
     * The maximum wind speed forecasted to occur during the period, in kilometers per hour.
     */
    readonly windSpeedMax?: number;
}
