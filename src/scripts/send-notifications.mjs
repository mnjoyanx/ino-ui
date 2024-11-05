import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

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
        subject: `Framework Update: Version ${version}`,
        html: `
          <h1>New Version Released: ${version}</h1>
          <p>Thank you for using our framework!</p>
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
