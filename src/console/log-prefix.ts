import chalk from 'chalk';
import { formatDate } from '../date/format.js';

const logDate = (process.env['log_date'] ?? 'true') === 'true';
const logTime = (process.env['log_time'] ?? 'true') === 'true';
const logPID = (process.env['log_pid'] ?? 'true') === 'true';

const pipe = chalk.gray(' │ ');
const pid = chalk.green(process.pid);

/**
 * Creates a prefix for verbose logging.
 *
 * @publicApi
 */
export function logPrefix() {
    const now = new Date();

    const prefix = [
        logPID ? pid : null,
        logDate ? formatDate(now, 'MM/DD/YYYY') : null,
        logTime ? formatDate(now, 'hh:mm:ss A') : null
    ]
        .filter((val) => val !== null)
        .join(pipe);

    return {
        toString: () => prefix,
        indent: ' '.repeat(prefix.length)
    };
}
