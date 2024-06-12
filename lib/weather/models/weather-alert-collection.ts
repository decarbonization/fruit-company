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

import { ProductData } from "./base";

/**
 * A collecton of weather alerts.
 */
export interface WeatherAlertCollection extends ProductData {
    /** An array of weather alert summaries. */
    readonly alerts: WeatherAlertSummary[];

    /** A URL that provides more information about the alerts. */
    readonly detailsUrl?: string;
}

/**
 * Detailed information about the weather alert.
 */
export interface WeatherAlertSummary {
    /**
     * An official designation of the affected area.
     */
    readonly areaId?: string;

    /**
     * A human-readable name of the affected area.
     */
    readonly areaName?: string;

    /**
     * How likely the event is to occur.
     */
    readonly certainty: WeatherAlertCertainty;

    /**
     * The ISO code of the reporting country.
     */
    readonly countryCode: string;

    /**
     * A human-readable description of the event.
     */
    readonly description: string;

    /**
     * The URL to a page containing detailed information about the event.
     */
    readonly detailsUrl: string;

    /**
     * The time the event went into effect.
     */
    readonly effectiveTime: Date;

    /**
     * The time when the underlying weather event is projected to end.
     */
    readonly eventEndTime?: Date;

    /**
     * The time when the underlying weather event is projected to start.
     */
    readonly eventOnsetTime?: Date;

    /**
     * The time when the event expires.
     */
    readonly expireTime: Date;

    /**
     * A unique identifier of the event.
     */
    readonly id: Date;

    /**
     * The time that event was issued by the reporting agency.
     */
    readonly issuedTime: Date;

    /**
     * An array of recommended actions from the reporting agency.
     */
    readonly responses: WeatherAlertResponseType[];

    /**
     * The level of danger to life and property.
     */
    readonly severity: WeatherAlertSeverity;

    /**
     * The name of the reporting agency.
     */
    readonly source: string;

    /**
     * An indication of urgency of action from the reporting agency.
     */
    readonly urgency?: WeatherAlertUrgency;
}


/**
 * How likely the event is to occur.
 */
export const enum WeatherAlertCertainty {
    /**
     * The event has already occurred or is ongoing.
     */
    observed = "observed",

    /**
     * The event is likely to occur (greater than 50% probability).
     */
    likely = "likely",

    /**
     * The event is unlikley to occur (less than 50% probability).
     */
    possible = "possible",

    /**
     * The event is not expected to occur (approximately 0% probability).
     */
    unlikely = "unlikely",

    /**
     * It is unknown if the event will occur.
     */
    unknown = "unknown",
}

/**
 * An indication of urgency of action from the reporting agency.
 */
export const enum WeatherAlertUrgency {
    /**
     * Take responsive action immediately.
     */
    immediate = "immediate",

    /**
     * Take responsive action in the next hour.
     */
    expected = "expected",

    /**
     * Take responsive action in the near future.
     */
    future = "future",

    /**
     * Responsive action is no longer required.
     */
    past = "past",

    /**
     * The urgency is unknown.
     */
    unknown = "unknown",
}

/**
 * The level of danger to life and property.
 */
export const enum WeatherAlertSeverity {
    /**
     * Extraordinary threat.
     */
    extreme = "extreme",

    /**
     * Significant threat.
     */
    severe = "severe",

    /**
     * Possible threat.
     */
    moderate = "moderate",

    /**
     * Minimal or no known threat.
     */
    minor = "minor",

    /**
     * Unknown threat.
     */
    unknown = "unknown",
}

/**
 * The recommended action from a reporting agency.
 */
export const enum WeatherAlertResponseType {
    /**
     * Take shelter in place.
     */
    shelter = "shelter",

    /**
     * Relocate.
     */
    evacuate = "evacuate",

    /**
     * Make preparations.
     */
    prepare = "prepare",

    /**
     * Execute a pre-planned activity.
     */
    execute = "execute",

    /**
     * Avoid the event.
     */
    avoid = "avoid",

    /**
     * Monitor the situation.
     */
    monitor = "monitor",

    /**
     * Assess the situation.
     */
    assess = "assess",

    /**
     * The event no longer poses a threat.
     */
    allClear = "allClear",

    /**
     * No action recommended.
     */
    none = "none",
}
