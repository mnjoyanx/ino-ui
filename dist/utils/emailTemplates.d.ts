interface UpdateInfo {
    version: string;
    changelog: string;
    frameworkName: string;
}
export declare function generateUpdateEmail({ version, changelog, frameworkName }: UpdateInfo): string;
export {};
