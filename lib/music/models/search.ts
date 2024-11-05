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

import { MusicResource } from "./base";
import { SongResource } from "./song";

/**
 * An object containing search results for a specific resource.
 */
export interface ResourceSearchResult<Datum extends MusicResource<object, object>> {
    /**
     * The resources for the search result.
     */
    readonly data: Datum[];

    /**
     * The relative location to fetch the search result.
     */
    readonly href?: string;

    /**
     * A relative cursor to fetch the next paginated 
     * collection of resources in the result, if more exist.
     */
    readonly next?: string;
}

/**
 * An object that represents the results of a catalog search query.
 */
export interface MusicSearchResults {
    /**
     * The activities results for a term search for specific resource types.
     */
    readonly activities?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The albums results for a term search for specific resource types.
     */
    readonly albums?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The Apple curators results for a term search for specific resource types.
     */
    readonly "apple-curators"?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The artists results for a term search for specific resource types.
     */
    readonly artists?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The curators results for a term search for specific resource types.
     */
    readonly curators?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The music videos results for a term search for specific resource types.
     */
    readonly "music-videos"?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The playlists results for a term search for specific resource types.
     */
    readonly playlists?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The record labels results for a term search for specific resource types.
     */
    readonly "record-labels"?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The songs results for a term search for specific resource types.
     */
    readonly songs?: ResourceSearchResult<SongResource>;

    /**
     * The stations results for a term search for specific resource types.
     */
    readonly stations?: ResourceSearchResult<MusicResource<object, object>>;

    /**
     * The top results for a term search for specific resource types.
     */
    readonly top?: ResourceSearchResult<MusicResource<object, object>>;
}

/**
 * The response to a search request.
 */
export interface MusicSearchResponse {
    /**
     * The results included in the response to a search request.
     */
    readonly results: MusicSearchResults;
}
