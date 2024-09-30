import { existsSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Checks if a file or directory exists at the specified path.
 *
 * This function attempts to check the existence of a file or directory by first joining
 * the given path segments. If the file is found, it returns the path; if not, it resolves
 * the absolute path and checks again. If the file still doesn't exist, an error is thrown.
 *
 * @param {...string[]} pathSegments - An array of path segments that are joined to form the full path.
 * @returns {string} The path to the file or directory if it exists.
 *
 * @throws {Error} If the file or directory does not exist at the constructed or resolved path.
 *
 * @example
 * try {
 *   const filePath = exists('folder', 'file.txt');
 *   console.log(`File exists at ${filePath}`);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export function exists(...pathSegments: string[]) {
    let path = join(...pathSegments);
    if (existsSync(path)) return path;
    path = resolve(path);
    if (existsSync(path)) return path;
    throw new Error(`File does not exist at ${path}.`);
}
