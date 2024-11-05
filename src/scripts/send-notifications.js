const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

async function sendNotifications() {
  const client = new MongoClient(process.env.MONGODB_URI);

  console.log(client, 'clieeent');

  try {
    await client.connect();
    const db = client.db('test');
    const subscribers = await db
      .collection('subscribers')
      .find({ isActive: true })
      .toArray();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const version = process.env.GITHUB_REF?.replace('refs/tags/', '') || '';

    const emailPromises = subscribers.map(subscriber =>
      transporter.sendMail({
        from: process.env.EMAIL_USER,
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
