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

import { MusicArtwork, MusicEditorialNotes, MusicPlayParameters, MusicPreview, MusicRelationship, MusicResource, UnknownMusicResource } from "./base";

/**
 * A specific audio variant for a song.
 */
export type SongAudioVariant =
    | 'dolby-atmos'
    | 'dolby-audio'
    | 'hi-res-lossless'
    | 'lossless'
    | 'lossy-stereo';

/**
 * A Recording Industry Association of America (RIAA) rating.
 */
export type SongContentRating =
    | 'clean'
    | 'explicit';

/**
 * The attributes for a song resource.
 */
export interface SongAttributes {
    /**
     * The name of the album the song appears on.
     */
    readonly albumName: string;

    /**
     * The artist’s name.
     */
    readonly artistName?: string;

    /**
     * (Extended) The URL of the artist for the content.
     */
    readonly artistUrl?: string;

    /**
     * The album artwork.
     */
    readonly artwork: MusicArtwork;

    /**
     * (Classical music only) The name of the artist or composer to attribute the song with.
     */
    readonly attribution?: string;

    /**
     * (Extended) Indicates the specific audio variant for a song.
     */
    readonly audioVariants?: SongAudioVariant[];

    /**
     * The song’s composer.
     */
    readonly composerName?: string;

    /**
     * The Recording Industry Association of America (RIAA) rating of the content.
     * No value means no rating.
     */
    readonly contentRating?: string;

    /**
     * The disc number of the album the song appears on.
     */
    readonly discNumber?: number;

    /**
     * The duration of the song in milliseconds.
     */
    readonly durationInMillis: number;

    /**
     * The notes about the song that appear in the Apple Music catalog.
     */
    readonly editorialNotes?: MusicEditorialNotes;

    /**
     * The genre names the song is associated with.
     */
    readonly genreNames: string[];

    /**
     * Indicates whether the song has lyrics available in the Apple Music catalog.
     */
    readonly hasLyrics: boolean;

    /**
     * Indicates whether the response delivered the song as an Apple Digital Master.
     */
    readonly isAppleDigitalMaster: boolean;

    /**
     * The International Standard Recording Code (ISRC) for the song.
     */
    readonly isrc?: string;

    /**
     * (Classical music only) The movement count of the song.
     */
    readonly movementCount?: number;

    /**
     * (Classical music only) The movement name of the song.
     */
    readonly movementName?: string;

    /**
     * (Classical music only) The movement number of the song.
     */
    readonly movementNumber?: number;

    /**
     * The localized name of the song.
     */
    readonly name: string;

    /**
     * When present, this attribute indicates that the song is available to play
     * with an Apple Music subscription. The value map may be used to initiate playback.
     * Previews of the song audio may be available with or without an Apple Music subscription.
     */
    readonly playParams?: MusicPlayParameters;

    /**
     * The preview assets for the song.
     */
    readonly previews: MusicPreview[];

    /**
     * The release date of the song, when known, in YYYY-MM-DD or YYYY format.
     * Prerelease songs may have an expected release date in the future.
     */
    readonly releaseDate?: string;

    /**
     * The number of the song in the album’s track list.
     */
    readonly trackNumber?: number;

    /**
     * The URL for sharing the song in Apple Music.
     */
    readonly url: string;

    /**
     * (Classical music only) The name of the associated work.
     */
    readonly workName?: string;
}

/**
 * The relationships for a song resource.
 */
export interface SongRelationships {
    /**
     * The albums associated with the song. By default, albums includes identifiers only.
     * 
     * Fetch limits: 10 default, 10 maximum
     */
    readonly albums: MusicRelationship<UnknownMusicResource>;

    /**
     * The artists associated with the song. By default, artists includes identifiers only.
     *
     * Fetch limits: 10 default, 10 maximum
     */
    readonly artists: MusicRelationship<UnknownMusicResource>;

    /**
     * The composers for a catalog song.
     */
    readonly composers: MusicRelationship<UnknownMusicResource>;

    /**
     * The genres associated with the song. By default, genres is not included.
     * 
     * Fetch limits: None
     */
    readonly genres: MusicRelationship<UnknownMusicResource>;

    /**
     * Library song for a catalog song if added to library.
     */
    readonly library: MusicRelationship<UnknownMusicResource>;

    /**
     * Music videos for a catalog song.
     */
    readonly "music-videos": MusicRelationship<UnknownMusicResource>;

    /**
     * The station associated with the song. By default, station is not included.
     *
     * Fetch limits: None
     */
    readonly station: MusicRelationship<UnknownMusicResource>;
}

/**
 * A resource object that represents a song.
 */
export interface SongResource extends MusicResource<SongAttributes, SongRelationships> {
}
