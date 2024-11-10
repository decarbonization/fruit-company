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

/**
 * A string containing the URL of the Apple WeatherKit REST services.
 */
export const weatherKitUrl = "https://weatherkit.apple.com";

/**
 * A base type for all weather data.
 */
export interface ProductData {
    /**
     * Descriptive information about the weather data.
     */
    readonly metadata: Metadata;
}

/**
 * Descriptive information about the weather data.
 */
export interface Metadata {
    /**
     * The URL of the legal attribution for the data source.
     */
    readonly attributionURL?: string;

    /**
     * The time when the weather data is no longer valid.
     */
    readonly expireTime: Date;

    /**
     * The ISO language code for localizable fields.
     */
    readonly language?: string;

    /**
     * The latitude of the relevant location.
     */
    readonly latitude: number;

    /**
     * The longitude of the relevant location.
     */
    readonly longitude: number;

    /**
     * The URL of a logo for the data provider.
     */
    readonly providerLogo?: string;

    /**
     * The name of the data provider.
     */
    readonly providerName?: string;

    /**
     * The time the weather data was procured.
     */
    readonly readTime: Date;

    /**
     * The time the provider reported the weather data.
     */
    readonly reportedTime?: Date;

    /**
     * The weather data is temporarily unavailable from the provider.
     */
    readonly temporarilyUnavailable?: boolean;

    /**
     * The system of units that the weather data is reported in. This is set to metric.
     */
    readonly units?: UnitsSystem;

    /**
     * The data format version.
     */
    readonly version: number;
}


/**
 * The direction of change of the sea level air pressure.
 */
export type PressureTrend =
    | "rising"
    | "falling"
    | "steady";

/**
 * The system of units that the weather data is reported in.
 */
export type UnitsSystem =
    | "m";

/**
 * The shape of the moon as seen by an observer on the ground at a given time.
 */
export type MoonPhase =
    | "new"
    | "waxingCrescent"
    | "firstQuarter"
    | "full"
    | "waxingGibbous"
    | "waningGibbous"
    | "thirdQuarter"
    | "waningCrescent";

/**
 * The type of precipitation forecasted to occur during the day.
 */
export type PrecipitationType =
    | "clear"
    | "precipitation"
    | "rain"
    | "snow"
    | "sleet"
    | "hail"
    | "mixed";

/**
 * A description of the current weather condition.
 */
export type WeatherCondition =
    | "BlowingDust"
    | "Clear"
    | "Cloudy"
    | "Foggy"
    | "Haze"
    | "MostlyClear"
    | "MostlyCloudy"
    | "PartlyCloudy"
    | "Smoky"
    | "Breezy"
    | "Windy"
    | "Drizzle"
    | "HeavyRain"
    | "IsolatedThunderstorms"
    | "Rain"
    | "SunShowers"
    | "ScatteredThunderstorms"
    | "StrongStorms"
    | "Thunderstorms"
    | "Frigid"
    | "Hail"
    | "Hot"
    | "Flurries"
    | "Sleet"
    | "Snow"
    | "SunFlurries"
    | "WintryMix"
    | "Blizzard"
    | "BlowingSnow"
    | "FreezingDrizzle"
    | "FreezingRain"
    | "HeavySnow"
    | "Hurricane"
    | "TropicalStorm";
