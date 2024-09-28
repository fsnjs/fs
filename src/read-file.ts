import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { exit } from 'process';
import { resolve } from 'path';

/**
 * Options for configuring the behavior of the `readFile` function.
 *
 * @property {string} [existsMsg] - Custom message to display when the file does not exist. If not provided, a default message will be used.
 * @property {string} [parseMsg] - Custom message to display when parsing the file fails. If not provided, a default message will be used.
 * @property {string} [readMsg] - Custom message to display when reading the file fails. If not provided, a default message will be used.
 * @property {boolean} [verbose=false] - If true, additional error details will be logged to the console.
 * @property {boolean} [parse=true] - If true, the file content will be parsed as JSON. If false, the content will be returned as a string.
 * @property {boolean} [exitOnErr=true] - If true, the program will exit on error. If false, it will return `undefined` on error.
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
 * Reads a file from the specified path, with options to control parsing, verbosity, and error handling.
 *
 * @param path The path to the file that needs to be read.
 * @param options Additional options for reading the file.
 * @returns The parsed content if `parse` is `true`, otherwise the raw file content as a string.
 *
 * @example
 * const data = readFile('/path/to/file.json', { parse: true });
 * console.log(data);
 */
export function readFile<T = any>(
    path: string,
    options?: ReadFileOptions & {
        parse?: true;
        exitOnErr?: true;
    }
): T;

/**
 * Reads a file from the specified path, returning the content as a string.
 *
 * @param path The path to the file that needs to be read.
 * @param options Additional options for reading the file.
 * @returns The raw file content as a string.
 *
 * @example
 * const content = readFile('/path/to/file.txt', { parse: false });
 * console.log(content);
 */
export function readFile(
    path: string,
    options: ReadFileOptions & {
        parse: false;
        exitOnErr?: true;
    }
): string;

/**
 * Reads a file from the specified path, optionally parsing its content. If `exitOnErr` is `false`, it returns `undefined` on failure.
 *
 * @template T The type of the parsed content. Defaults to `any` if the file is parsed as JSON.
 * @param path The path to the file that needs to be read.
 * @param options Additional options for reading the file.
 * @returns The parsed content if `parse` is `true`, otherwise `undefined` on failure.
 *
 * @example
 * const data = readFile('/path/to/file.json', { parse: true, exitOnErr: false });
 * if (data) {
 *   console.log(data);
 * }
 */
export function readFile<T = any>(
    path: string,
    options?: ReadFileOptions & {
        parse?: true;
        exitOnErr: false;
    }
): T | undefined;

/**
 * Reads a file from the specified path, returning the content as a string. If `exitOnErr` is `false`, it returns `undefined` on failure.
 *
 * @param path The path to the file that needs to be read.
 * @param options Additional options for reading the file.
 * @returns The raw file content as a string, or `undefined` if the file cannot be read.
 *
 * @example
 * const content = readFile('/path/to/file.txt', { parse: false, exitOnErr: false });
 * if (content) {
 *   console.log(content);
 * }
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

    if (!existsSync(path)) {
        path = resolve(path);
        if (!existsSync(path)) {
            console.error(
                chalk.red(existsMsg ?? `File does not exist at ${path}.`)
            );
            if (exitOnErr) exit();
            return;
        }
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
