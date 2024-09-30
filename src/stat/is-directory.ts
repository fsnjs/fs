import { statSync } from 'fs';
import { join } from 'path';

export function isDirectory(...pathSegments: string[]) {
    try {
        return statSync(join(...pathSegments)).isDirectory();
    } catch {
        return false;
    }
}
