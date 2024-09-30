import chalk from 'chalk';
import { readFileSync } from 'fs';
import { exit } from 'process';
import { exists } from './exists.js';

/**
 * Options for configuring the behavior of the `readFile` function.
 *
 * @prop {string} [existsMsg] - Custom message to display when the file does not exist.
 * If not provided, _File does not exist at ${path}._ will be used.
 * @prop {string} [readMsg] - Custom message to display when reading the file fails. If not provided, a default message will be used.
 * @prop {string} [parseMsg] - Custom message to display when parsing the file fails.
 * If not provided, a default message will be used.
 * @prop {boolean} [verbose=false] - If true, additional error details will be logged to the console.
 * @prop {boolean} [parse=true] - If true, the file content will be parsed as JSON. If false, the content will be returned as a string.
 * @prop {boolean} [exitOnErr=true] - If true, the program will exit on error. If false, it will return `undefined` on error.
 */
export declare interface ReadFileOptions {
    existsMsg?: string;
    parseMsg?: string;
    readMsg?: string;
    verbose?: boolean;
    parse?: boolean;
    exitOnErr?: boolean;
}

/**
 * Reads and parses the file at `path`.
 *
 * If the files does not exist or a reading or parsing error occurs,
 * terminates the application with `exit()`.
 *
 * @param path A system path
 * @param options Additional options for reading the file
 * @returns The file at `path`, parsed with `json.parse()`
 */
export function readFile<T = any>(
    path: string,
    options?: ReadFileOptions & {
        parse?: true;
        exitOnErr?: true;
    }
): T;

/**
 * Reads the file at `path`.
 *
 * If the files does not exist or a reading error occurs,
 * terminates the application with `exit()`.
 *
 * @param path A system path
 * @param options Additional options for reading the file
 * @returns The raw file content as a string.
 */
export function readFile(
    path: string,
    options: ReadFileOptions & {
        parse: false;
        exitOnErr?: true;
    }
): string;

/**
 * Reads and parses the file at `path`.
 *
 * @template T The type of the parsed content. Defaults to `any`.
 * @param path A system path
 * @param options Additional options for reading the file
 * @returns The parsed content or `undefined` on failure.
 */
export function readFile<T = any>(
    path: string,
    options?: ReadFileOptions & {
        parse?: true;
        exitOnErr: false;
    }
): T | undefined;

/**
 * Reads the file at `path`.
 *
 * @param path A system path
 * @param options Additional options for reading the file
 * @returns The raw content as a string or `undefined` on failure.
 */
export function readFile(
    path: string,
    options: ReadFileOptions & {
        parse: false;
        exitOnErr?: false;
    }
): string | undefined;

export function readFile(
    path: string,
    {
        parse,
        verbose,
        existsMsg,
        parseMsg,
        readMsg,
        exitOnErr
    }: ReadFileOptions = {}
): any {
    parse ??= true;
    verbose ??= false;
    exitOnErr ??= true;

    try {
        path = exists(path);
    } catch (e) {
        existsMsg ??= `File does not exist at ${path}.`;
        console.error(chalk.red(existsMsg));
        if (verbose) console.error(e);
    }

    let file: string;

    try {
        file = readFileSync(path, 'utf-8');
    } catch (e) {
        console.error(chalk.red(readMsg ?? `Failed to read file at ${e}`));
        if (verbose) console.error(e);
        if (exitOnErr) exit();
        return;
    }

    if (!parse) return file;

    try {
        return JSON.parse(file);
    } catch (e) {
        console.error(
            chalk.red(parseMsg ?? `Failed to parse file read from ${e}.`)
        );
        if (verbose) console.error(e);
        if (exitOnErr) exit();
    }
}
