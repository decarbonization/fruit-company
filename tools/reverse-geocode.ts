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
import { fulfill, noLogger, verboseConsoleLogger } from "serene-front";
import { LocationCoordinates } from "serene-front/data";
import { MapsToken, ReverseGeocodeAddress } from "../lib/maps";

program
    .name("get-weather")
    .description("CLI to verify MapKit reverse geocoding APIs")
    .requiredOption("--app <VALUE>", "The identifier of a MapKit JS app")
    .requiredOption("--team <VALUE>", "The identifier of a MapKit JS team")
    .requiredOption("--keyid <VALUE>", "The identifier of a MapKit JS private key")
    .requiredOption("--keyfile <VALUE>", "The path to a MapKit JS private key")
    .requiredOption("--latitude <VALUE>", "The latitude of the location to get human readable details for", LocationCoordinates.parseCoordinate)
    .requiredOption("--longitude <VALUE>", "The latitude of the location to get human readable details for", LocationCoordinates.parseCoordinate)
    .option("--language <VALUE>", "The language to request details in", "en")
    .option("-v --verbose", "Log additional information");

program.parse();

const opts = program.opts();

(async () => {
    const mapsToken = new MapsToken(
        opts.app,
        opts.team,
        opts.keyid,
        await fs.readFile(opts.keyfile),
    );
    const getAddress = new ReverseGeocodeAddress({
        location: new LocationCoordinates(opts.latitude, opts.longitude),
        language: opts.language,
    });
    const logger = opts.verbose ? verboseConsoleLogger : noLogger;
    try {
        const results = await fulfill({ authority: mapsToken, request: getAddress, logger });
        console.info(JSON.stringify(results, undefined, 2));
    } catch (error) {
        console.error(`Failed: ${error}`);
    }
})();
