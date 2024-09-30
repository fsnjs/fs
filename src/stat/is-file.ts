import { statSync } from 'fs';
import { join } from 'path';

export function isFile(...pathSegments: string[]) {
    try {
        return statSync(join(...pathSegments)).isFile();
    } catch {
        return false;
    }
}
