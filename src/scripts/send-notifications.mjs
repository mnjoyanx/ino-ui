import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const releaseNotes = {
  features: [
    'Subscribers can now receive notifications about new versions',
    'Improved documentation',
  ],
  bugFixes: ['Fixed Modal closeOnOverlayClick'],
  improvements: ['Reduced bundle size'],
};

// const changelogUrl = 'https://github.com/Ino-UI/ino-ui-tv/releases';
const changelogUrl = 'https://ino-tv-ui-preview.netlify.app/';

const generateListItems = items => {
  return items
    .map(item => `<li style="margin-bottom: 8px;">${item}</li>`)
    .join('');
};

async function sendNotifications() {
  const client = new MongoClient(
    'mongodb+srv://tigranmnjoyan:K2Yff0XGCkqQshzT@cluster0.v1ddu.mongodb.net/'
  );

  try {
    await client.connect();
    const db = client.db('test');
    const subscribers = await db
      .collection('subscribers')
      .find({})
      .toArray();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tigranmnjoyan@gmail.com',
        pass: 'clfc osla rrch nlfj',
      },
    });

    const version = process.env.GITHUB_REF?.replace('refs/tags/', '') || '';

    const emailPromises = subscribers.map(subscriber =>
      transporter.sendMail({
        from: 'tigranmnjoyan@gmail.com',
        to: subscriber.email,
        subject: `🎉 Framework Update: Version ${version} Released!`,
        html: `
          <!DOCTYPE html>
          <html>
            <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="background: #4A90E2; padding: 20px; border-radius: 8px 8px 0 0;">
                  <h1 style="color: #ffffff; margin: 0; text-align: center;">New Version Released! 🚀</h1>
                </div>
                
                <div style="padding: 20px;">
                  <h2 style="color: #4A90E2;">Version ${version}</h2>
                  
                  <p style="line-height: 1.6;">We're excited to announce the latest update to our framework! Here's what's new:</p>
                  
                  <div style="margin: 20px 0;">
                    <h3 style="color: #4A90E2;">✨ New Features</h3>
                    <ul style="line-height: 1.6;">
                      ${generateListItems(releaseNotes.features)}
                    </ul>

                    <h3 style="color: #4A90E2;">🐛 Bug Fixes</h3>
                    <ul style="line-height: 1.6;">
                      ${generateListItems(releaseNotes.bugFixes)}
                    </ul>

                    <h3 style="color: #4A90E2;">🔧 Improvements</h3>
                    <ul style="line-height: 1.6;">
                      ${generateListItems(releaseNotes.improvements)}
                    </ul>
                  </div>

                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${changelogUrl}" style="background: #4A90E2; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">See New Changes</a>
                  </div>

                  <p style="margin-top: 30px; color: #666; font-size: 14px;">Thank you for being part of our community!</p>
                </div>

                <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
                  <p>You're receiving this email because you subscribed to framework updates.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    );

    await Promise.all(emailPromises);
    console.log(
      `Successfully sent notifications to ${subscribers.length} subscribers ${db}`
    );
  } catch (error) {
    console.error('Error sending notifications:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

sendNotifications();
