import { readFileSync } from 'fs';
import { join } from 'path';

interface Version {
    major: number;
    minor: number;
    patch: number;
}

export function parseVersion(version: string): Version {
    const [major, minor, patch] = version.replace('v', '').split('.').map(Number);
    return { major, minor, patch };
}

export function isNewMajorVersion(oldVersion: string, newVersion: string): boolean {
    const oldV = parseVersion(oldVersion);
    const newV = parseVersion(newVersion);
    return newV.major > oldV.major;
}

export function getChangelog(): string {
    try {
        const changelogPath = join(process.cwd(), 'CHANGELOG.md');
        return readFileSync(changelogPath, 'utf-8');
    } catch (error) {
        console.error('Error reading changelog:', error);
        return '';
    }
} 