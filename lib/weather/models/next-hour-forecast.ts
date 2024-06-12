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

import { PrecipitationType, ProductData } from "./base";

/**
 * The next hour forecast information.
 */
export interface NextHourForecast extends ProductData {
    /**
     * The time the forecast ends.
     */
    readonly forecastEnd?: Date;

    /**
     * The time the forecast starts.
     */
    readonly forecastStart?: Date;

    /**
     * An array of the forecast minutes.
     */
    readonly minutes: ForecastMinute[];

    /**
     * An array of the forecast summaries.
     */
    readonly summary: ForecastPeriodSummary[];
}

/**
 * The precipitation forecast for a specified minute.
 */
export interface ForecastMinute {
    /**
     * The probability of precipitation during this minute.
     */
    readonly precipitationChance: number;

    /** 
     * The precipitation intensity in millimeters per hour.
     */
    readonly precipitationIntensity: number;

    /**
     * The start time of the minute.
     */
    readonly startTime: Date;
}

/**
 * The summary for a specified period in the minute forecast.
 */
export interface ForecastPeriodSummary {
    /** 
     * The type of precipitation forecasted.
     */
    readonly condition: PrecipitationType;

    /** 
     * The end time of the forecast.
     */
    readonly endTime?: Date;

    /** 
     * The probability of precipitation during this period.
     */
    readonly precipitationChance: number;

    /** 
     * The precipitation intensity in millimeters per hour.
     */
    readonly precipitationIntensity: number;

    /** 
     * The start time of the forecast.
     */
    readonly startTime: Date;
}
