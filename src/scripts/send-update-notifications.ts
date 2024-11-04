import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/emailService';
import { getChangelog, isNewMajorVersion } from '../utils/versionChecker';
import { generateUpdateEmail } from '../utils/emailTemplates';

const prisma = new PrismaClient();

async function sendUpdateNotifications() {
    try {
        // Get all subscribers
        const subscribers = await prisma.subscriber.findMany({
            where: { isActive: true },
            select: { email: true }
        });

        const newVersion = process.env.GITHUB_REF_NAME || ''; // Gets the tag name
        const changelog = getChangelog();

        // Send emails to all subscribers
        const emailPromises = subscribers.map(subscriber =>
            sendEmail({
                from: process.env.SMTP_USER!,
                to: subscriber.email,
                subject: `Framework Update: Version ${newVersion}`,
                html: generateUpdateEmail({
                    version: newVersion,
                    changelog,
                    frameworkName: 'Your Framework Name'
                })
            })
        );

        await Promise.all(emailPromises);
        console.log(`Successfully sent update notifications to ${subscribers.length} subscribers`);
    } catch (error) {
        console.error('Error sending update notifications:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

sendUpdateNotifications(); 