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
import { MusicDeveloperToken } from "../lib/music";

program
    .name("music-dev-token")
    .description("Get a bearer token to use Apple Music APIs")
    .requiredOption("--app <VALUE>", "The identifier of a media app")
    .requiredOption("--team <VALUE>", "The identifier of a media team")
    .requiredOption("--keyid <VALUE>", "The identifier of a media private key")
    .requiredOption("--keyfile <VALUE>", "The path to a media private key");

program.parse();

const opts = program.opts();

(async () => {
    const musicToken = new MusicDeveloperToken(
        opts.app,
        opts.team,
        opts.keyid,
        await fs.readFile(opts.keyfile),
    );
    await musicToken.refresh({ fetch });
    console.log(musicToken.bearerToken);
})();
