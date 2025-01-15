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
import { MusicDeveloperToken, SearchMusicCatalog } from "../lib/music";

program
    .name("song-search")
    .description("CLI to verify Apple Music APIs")
    .requiredOption("--app <VALUE>", "The identifier of a media app")
    .requiredOption("--team <VALUE>", "The identifier of a media team")
    .requiredOption("--keyid <VALUE>", "The identifier of a media private key")
    .requiredOption("--keyfile <VALUE>", "The path to a media private key")
    .requiredOption("--query <VALUE>", "What to search for")
    .option("--storefront <VALUE>", "The storefront to search in", "us")
    .option("--language <VALUE>", "The language to return search results in", "en")
    .option("-v --verbose", "Log additional information");

program.parse();

const opts = program.opts();

(async () => {
    const musicToken = new MusicDeveloperToken(
        opts.app,
        opts.team,
        opts.keyid,
        await fs.readFile(opts.keyfile, { encoding: 'utf8' }),
    );
    const searchSongs = new SearchMusicCatalog({
        storefront: opts.storefront,
        types: ['songs'],
        term: opts.query,
        language: opts.language,
    });
    const logger = opts.verbose ? verboseConsoleLogger : noLogger;
    try {
        const results = await fulfill({ authority: musicToken, request: searchSongs, logger });
        console.info(JSON.stringify(results, undefined, 2));
    } catch (error) {
        console.error(`Failed: ${error}`);
    }
})();
