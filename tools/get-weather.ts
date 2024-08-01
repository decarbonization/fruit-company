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

import { program } from "commander";
import * as fs from "fs/promises";
import { LocationCoordinates } from "serene-front/data";
import { allWeatherDataSets, WeatherQuery, WeatherToken } from "../lib/weather";
import { fulfill, noLogger, verboseConsoleLogger } from "serene-front";
import { addDays, addHours } from "date-fns";

program
    .name("get-weather")
    .description("CLI to verify WeatherKit APIs")
    .requiredOption("--app <VALUE>", "The identifier of a WeatherKit REST app")
    .requiredOption("--team <VALUE>", "The identifier of a WeatherKit REST team")
    .requiredOption("--keyid <VALUE>", "The identifier of a WeatherKit REST private key")
    .requiredOption("--keyfile <VALUE>", "The path to a WeatherKit REST private key")
    .requiredOption("--latitude <VALUE>", "The latitude of the location to get current conditions for", LocationCoordinates.parseCoordinate)
    .requiredOption("--longitude <VALUE>", "The longitude of the location to get current conditions for", LocationCoordinates.parseCoordinate)
    .option("--language <VALUE>", "The language to request details in", "en")
    .option("--timezone <VALUE>", "The time zone to use for dates and times", "America/New_York")
    .option("--country <VALUE>", "The code of the country to get weather alerts for", "US")
    .option("--days <VALUE>", "The number of days to include in the forecast", parseInt, 7)
    .option("--hours <VALUE>", "The number of hours to include in the forecast", parseInt, 24)
    .option("-v --verbose", "Log additional information");

program.parse();

const opts = program.opts();

(async () => {
    const weatherToken = new WeatherToken(
        opts.app,
        opts.team,
        opts.keyid,
        await fs.readFile(opts.keyfile),
    );
    const currentAsOf = new Date();
    const getWeather = new WeatherQuery({
        location: new LocationCoordinates(opts.latitude, opts.longitude),
        language: opts.language,
        timezone: opts.timezone,
        countryCode: opts.country,
        currentAsOf,
        dailyEnd: addDays(currentAsOf, opts.days),
        dailyStart: currentAsOf,
        dataSets: allWeatherDataSets,
        hourlyEnd: addHours(currentAsOf, opts.hours),
        hourlyStart: currentAsOf,
    });
    const logger = opts.verbose ? verboseConsoleLogger : noLogger;
    try {
        const results = await fulfill({ authority: weatherToken, request: getWeather, logger });
        console.info(JSON.stringify(results, undefined, 2));
    } catch (error) {
        console.error(`Failed: ${error}`);
    }
})();
