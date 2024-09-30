import Chalk from 'chalk';
import { isNativeError } from 'util/types';

import { logPrefix } from './log-prefix.js';

/**
 * An implementation of `console` that colorizes messages
 * by type.
 */
export namespace Console {
    const colorize = (args: any[], colorFn: Function) => {
        return args.map((arg) => {
            if (typeof arg === 'object') {
                try {
                    return (
                        logPrefix().toString() +
                        colorFn(JSON.stringify(arg, null, 3))
                    );
                } catch {
                    return arg;
                }
            }

            logPrefix().toString() + colorFn(arg);
        });
    };

    export const debug = (...args: any[]) =>
        console.debug(...colorize(args, Chalk.gray));

    export const warn = (...args: any[]) =>
        console.warn(...colorize(args, Chalk.yellow));

    export const info = (...args: any[]) =>
        console.info(...colorize(args, Chalk.cyan));

    export const error = (...args: any[]) => {
        args.forEach((arg) => {
            if (isNativeError(arg)) {
                error(
                    logPrefix().toString(),
                    Chalk.red(console.log(arg.stack))
                );
            } else {
                error(logPrefix().toString(), Chalk.red(arg));
            }
        });
    };
}
