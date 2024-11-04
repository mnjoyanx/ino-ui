import nodemailer from 'nodemailer';

interface EmailConfig {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(config: EmailConfig): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail(config);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
} 