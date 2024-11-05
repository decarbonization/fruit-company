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
 * A string containing the URL of the Apple Music API services.
 */
export const appleMusicBaseUrl = "https://api.music.apple.com/v1";

/**
 * A resource object.
 */
export interface MusicResource<
    Attributes extends object,
    Relationships extends object,
    Meta extends object = never,
    Views extends object = never,
> {
    /**
     * The identifier for the resource object.
     */
    readonly id: string;

    /**
     * The type of resource.
     */
    readonly type: string;

    /**
     * The relative location for the resource.
     */
    readonly href: string;

    /**
     * Attributes for the resource.
     */
    readonly attributes?: Attributes;

    /**
     * Relationships for the resource.
     */
    readonly relationships?: Relationships;

    /**
     * Information about the request or response.
     */
    readonly meta?: Meta;

    /**
     * The relationship views for the resource.
     */
    readonly views?: Views;
}

/**
 * A resource object for which a type definition does not yet exist.
 */
export type UnknownMusicResource = MusicResource<object, object>;

/**
 * A response object for the request.
 */
export interface MusicResponse<Datum extends MusicResource<object, object>> {
    /**
     * The resources included in the response.
     */
    readonly data: Datum[];
}

/**
 * A response object composed of paginated resource objects for the request.
 */
export interface MusicPaginatedResponse<Datum extends MusicResource<object, object>> extends MusicResponse<Datum> {
    /**
     * A relative cursor to fetch the next paginated collection of resources for the request if more exist.
     */
    readonly next?: string;
}

/**
 * A relationship connecting one object to many others.
 */
export interface MusicRelationship<Datum extends MusicResource<object, object>> {
    /**
     * A relative location for the relationship.
     */
    readonly href?: string;

    /**
     * A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.
     */
    readonly next?: string;

    /**
     * The resources associated with the object.
     */
    readonly data: Datum[];
}

/**
 * An object that represents artwork.
 */
export interface MusicArtwork {
    /**
     * The URL to request the image asset. {w}x{h}must precede image filename,
     * as placeholders for the width and height values as described above. 
     */
    readonly url: string;

    /**
     * The maximum height available for the image.
     */
    readonly height: number;

    /**
     * The maximum width available for the image.
     */
    readonly width: number;

    /**
     * The average background color of the image.
     */
    readonly bgColor?: string;

    /**
     * The primary text color used if the background color gets displayed.
     */
    readonly textColor1?: string;

    /**
     * The secondary text color used if the background color gets displayed.
     */
    readonly textColor2?: string;

    /**
     * The tertiary text color used if the background color gets displayed.
     */
    readonly textColor3?: string;

    /**
     * The final post-tertiary text color used if the background color gets displayed.
     */
    readonly textColor4?: string;
}

/**
 * An object that represents a description attribute.
 */
export interface MusicDescriptionAttribute {
    /**
     * A description to show when the content is prominently displayed.
     */
    readonly standard: string;

    /**
     * An abbreviated description to show inline or when the content appears alongside other content.
     */
    readonly short?: string;
}

/**
 * An object that represents a notes attribute.
 */
export interface MusicEditorialNotes {
    /**
     * Abbreviated notes shown inline or when the content appears alongside other content.
     */
    readonly short?: string;

    /**
     * Notes shown when the content is prominently displayed.
     */
    readonly standard?: string;

    /**
     * Name for the editorial notes.
     */
    readonly name?: string;

    /**
     * The tag line for the editorial notes.
     */
    readonly tagline?: string;
}

/**
 * An object that represents play parameters for resources.
 */
export interface MusicPlayParameters {
    /**
     * The ID of the content to use for playback.
     */
    readonly id: string;

    /**
     * The kind of the content to use for playback.
     */
    readonly kind: string;
}

/**
 * An object that represents a preview for resources.
 */
export interface MusicPreview {
    /**
     * The preview artwork for the associated preview music video.
     */
    readonly artwork?: MusicArtwork;

    /**
     * The preview URL for the content.
     */
    readonly url: string;

    /**
     * The HLS preview URL for the content.
     */
    readonly hlsUrl?: string;
}

/**
 * The Source object represents the source of an error.
 */
export interface MusicErrorSource {
    /**
     * The URI query parameter that caused the error.
     */
    readonly parameter?: string;

    /**
     * A pointer to the associated entry in the request document.
     */
    readonly pointer?: string;
}

/**
 * Information about an error that occurred while processing a request.
 */
export interface MusicError {
    /**
     * The code for this error. For possible values, see HTTP Status Codes.
     */
    readonly code: string;
    
    /**
     * A long, possibly localized, description of the problem.
     */
    readonly detail?: string;
    
    /**
     * A unique identifier for this occurrence of the error.
     */
    readonly id: string;
    
    /**
     * An object containing references to the source of the error. For possible members, see Source object.
     */
    readonly source?: MusicErrorSource;
    
    /**
     * The HTTP status code for this problem.
     */
    readonly status: string;
    
    /**
     * A short, possibly localized, description of the problem.
     */
    readonly title: string;
}

/**
 * A response object indicating that an error occurred while processing the request.
 */
export interface MusicErrorsResponse {
    /**
     * The collection of errors that occurred while processing the request.
     */
    readonly errors: MusicError[];
}
