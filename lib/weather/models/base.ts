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
export const enum PressureTrend {
    /**
     * The sea level air pressure is increasing.
     */
    rising = "rising",

    /**
     * The sea level air pressure is decreasing.
     */
    falling = "falling",

    /**
     * The sea level air pressure is remaining about the same.
     */
    steady = "steady",
}

/**
 * The system of units that the weather data is reported in.
 */
export const enum UnitsSystem {
    /**
     * The metric system.
     */
    metric = "m",
}

/**
 * The shape of the moon as seen by an observer on the ground at a given time.
 */
export const enum MoonPhase {
    /**
     * The moon isn’t visible.
     */
    new = "new",

    /**
     * A crescent-shaped sliver of the moon is visible, and increasing in size.
     */
    waxingCrescent = "waxingCrescent",

    /**
     * Approximately half of the moon is visible, and increasing in size.
     */
    firstQuarter = "firstQuarter",

    /**
     * The entire disc of the moon is visible.
     */
    full = "full",

    /**
     * More than half of the moon is visible, and increasing in size.
     */
    waxingGibbous = "waxingGibbous",

    /**
     * More than half of the moon is visible, and decreasing in size.
     */
    waningGibbous = "waningGibbous",

    /**
     * Approximately half of the moon is visible, and decreasing in size.
     */
    thirdQuarter = "thirdQuarter",

    /**
     * A crescent-shaped sliver of the moon is visible, and decreasing in size.
     */
    waningCrescent = "waningCrescent",
}

/**
 * The type of precipitation forecasted to occur during the day.
 */
export const enum PrecipitationType {
    /**
     * No precipitation is occurring.
     */
    clear = "clear",

    /**
     * An unknown type of precipitation is occuring.
     */
    precipitation = "precipitation",

    /**
     * Rain or freezing rain is falling.
     */
    rain = "rain",

    /**
     * Snow is falling.
     */
    snow = "snow",

    /**
     * Sleet or ice pellets are falling.
     */
    sleet = "sleet",

    /**
     * Hail is falling.
     */
    hail = "hail",

    /**
     * Winter weather (wintery mix or wintery showers) is falling.
     */
    mixed = "mixed",
}

/**
 * A description of the current weather condition.
 */
export const enum WeatherCondition {
    /**
     * Blowing dust or sandstorm.
     **/
    blowingDust = "BlowingDust",

    /**
     * Clear.
     **/
    clear = "Clear",

    /**
     * Cloudy, overcast conditions.
     **/
    cloudy = "Cloudy",

    /**
     * Fog.
     **/
    foggy = "Foggy",

    /**
     * Haze.
     **/
    haze = "Haze",

    /**
     * Mostly clear.
     **/
    mostlyClear = "MostlyClear",

    /**
     * Mostly cloudy.
     **/
    mostlyCloudy = "MostlyCloudy",

    /**
     * Partly cloudy.
     **/
    partlyCloudy = "PartlyCloudy",

    /**
     * Smoky.
     **/
    smoky = "Smoky",

    /**
     * Breezy, light wind.
     **/
    breezy = "Breezy",

    /**
     * Windy.
     **/
    windy = "Windy",

    /**
     * Drizzle or light rain.
     **/
    drizzle = "Drizzle",

    /**
     * Heavy rain.
     **/
    heavyRain = "HeavyRain",

    /**
     * Thunderstorms covering less than 1/8 of the forecast area.
     **/
    isolatedThunderstorms = "IsolatedThunderstorms",

    /**
     * Rain.
     **/
    rain = "Rain",

    /**
     * Rain with visible sun.
     **/
    sunShowers = "SunShowers",

    /**
     * Numerous thunderstorms spread across up to 50% of the forecast area.
     **/
    scatteredThunderstorms = "ScatteredThunderstorms",

    /**
     * Notably strong thunderstorms.
     **/
    strongStorms = "StrongStorms",

    /**
     * Thunderstorms.
     **/
    thunderstorms = "Thunderstorms",

    /**
     * Frigid conditions, low temperatures, or ice crystals.
     **/
    frigid = "Frigid",

    /**
     * Hail.
     **/
    hail = "Hail",

    /**
     * High temperatures.
     **/
    hot = "Hot",

    /**
     * Flurries or light snow.
     **/
    flurries = "Flurries",

    /**
     * Sleet.
     **/
    sleet = "Sleet",

    /**
     * Snow.
     **/
    snow = "Snow",

    /**
     * Snow flurries with visible sun.
     **/
    sunFlurries = "SunFlurries",

    /**
     * Wintry mix.
     **/
    wintryMix = "WintryMix",

    /**
     * Blizzard.
     **/
    blizzard = "Blizzard",

    /**
     * Blowing or drifting snow.
     **/
    blowingSnow = "BlowingSnow",

    /**
     * Freezing drizzle or light rain.
     **/
    freezingDrizzle = "FreezingDrizzle",

    /**
     * Freezing rain.
     **/
    freezingRain = "FreezingRain",

    /**
     * Heavy snow.
     **/
    heavySnow = "HeavySnow",

    /**
     * Hurricane.
     **/
    hurricane = "Hurricane",

    /**
     * Tropical storm.
     **/
    tropicalStorm = "TropicalStorm",
}

/**
 * A description of the risk to the average person for a UV index.
 */
export const enum UVIndexRisk {
    /**
     * Low danger from UV rays for the average person.
     */
    low = "low",

    /**
     * Moderate danger from UV rays for the average person.
     */
    moderate = "moderate",

    /**
     * High danger from UV rays for the average person.
     */
    high = "high",

    /**
     * Very high danger from UV rays for the average person.
     */
    veryHigh = "veryHigh",


    /**
     * Extreme danger from UV rays for the average person.
     */
    extreme = "extreme",
}

/**
 * Derive the risk a given UV Index poses to the average person.
 * 
 * @param uvIndex The UV Index.
 * @returns The risk.
 */
export function uvIndexRiskFrom(uvIndex: number): UVIndexRisk {
    if (uvIndex >= 0 && uvIndex <= 2) {
        return UVIndexRisk.low;
    } else if (uvIndex >= 3 && uvIndex <= 5) {
        return UVIndexRisk.moderate;
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        return UVIndexRisk.high;
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        return UVIndexRisk.veryHigh;
    } else if (uvIndex >= 11) {
        return UVIndexRisk.extreme;
    } else {
        throw new RangeError(`<${uvIndex}> is not a valid UV Index`);
    }
}
