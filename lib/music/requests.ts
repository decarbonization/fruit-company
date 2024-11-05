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

import { RESTError, SereneRequest, SereneRequestParseOptions, SereneRequestPrepareOptions } from "serene-front";
import { MusicDeveloperToken } from "./token";

const appleMusicBaseUrl = "https://api.music.apple.com/v1";

export type MusicCatalogType =
    | 'activities'
    | 'albums'
    | 'apple-curators'
    | 'artists'
    | 'curators'
    | 'music-videos'
    | 'playlists'
    | 'record-labels'
    | 'songs'
    | 'stations';

export type MusicCatalogSearchModification =
    | 'topResults';

export interface SearchMusicCatalogOptions {
    readonly storefront: string;
    readonly types: MusicCatalogType[];
    readonly term: string;
    readonly language?: string;
    readonly limit?: number;
    readonly offset?: number;
    readonly with?: MusicCatalogSearchModification[];
}

export class SearchMusicCatalog implements SereneRequest<MusicDeveloperToken, any> {
    constructor(private readonly options: SearchMusicCatalogOptions) { }

    prepare({ }: SereneRequestPrepareOptions<MusicDeveloperToken>): Request {
        const url = new URL(`${appleMusicBaseUrl}/catalog/${this.options.storefront}/search`)
        url.searchParams.append("types", this.options.types.join(","))
        url.searchParams.append("term", this.options.term)
        if (this.options.language !== undefined) {
            url.searchParams.append("l", this.options.language)
        }
        if (this.options.limit !== undefined) {
            url.searchParams.append("limit", String(this.options.limit))
        }
        if (this.options.offset !== undefined) {
            url.searchParams.append("offset", String(this.options.offset))
        }
        if (this.options.with !== undefined) {
            url.searchParams.append("with", this.options.with.join(","))
        }
        return new Request(url)
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<MusicDeveloperToken>): Promise<any> {
        if (!fetchResponse.ok) {
            throw new RESTError(
                fetchResponse.status,
                fetchResponse.statusText,
                `<${fetchResponse.url}>`
            );
        }
        return await fetchResponse.json();
    }
}
