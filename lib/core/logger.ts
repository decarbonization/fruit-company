import { FruitAuthority } from "./authority";

/**
 * An event describing an operation which the fruit-company
 * library is about to or has undertaken.
 */
export type FruitLogEvent =
    | { event: "willRefreshAuthority", authority: FruitAuthority, retry?: number }
    | { event: "willAuthenticate", authority: FruitAuthority, fetchRequest: Request }
    | { event: "willFetch", fetchRequest: Request }
    | { event: "willParse", fetchResponse: Response };

/**
 * A function which records an operation which the fruit-company
 * library is about to or has undertaken.
 */
export type FruitLogger = (event: FruitLogEvent) => void;

/**
 * The default logger used when none is specified by a caller.
 */
export const defaultLogger: FruitLogger = (_event: FruitLogEvent) => { };
