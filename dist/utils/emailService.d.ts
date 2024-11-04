interface EmailConfig {
    from: string;
    to: string;
    subject: string;
    html: string;
}
export declare function sendEmail(config: EmailConfig): Promise<void>;
export {};
