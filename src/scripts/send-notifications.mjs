import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

async function sendNotifications() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('your_database_name');
    const subscribers = await db
      .collection('subscribers')
      .find({ isActive: true })
      .toArray();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const version = process.env.GITHUB_REF?.replace('refs/tags/', '') || '';

    const emailPromises = subscribers.map(subscriber =>
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: subscriber.email,
        subject: `Framework Update: Version ${version}`,
        html: `
          <h1>New Version Released: ${version}</h1>
          <p>Thank you for using our framework!</p>
        `,
      })
    );

    await Promise.all(emailPromises);
    console.log(
      `Successfully sent notifications to ${subscribers.length} subscribers`
    );
  } catch (error) {
    console.error('Error sending notifications:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

sendNotifications();
