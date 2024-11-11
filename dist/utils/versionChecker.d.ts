interface Version {
    major: number;
    minor: number;
    patch: number;
}
export declare function parseVersion(version: string): Version;
export declare function isNewMajorVersion(oldVersion: string, newVersion: string): boolean;
export declare function getChangelog(): string;
export {};
