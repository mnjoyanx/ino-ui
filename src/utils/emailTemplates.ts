interface UpdateInfo {
    version: string;
    changelog: string;
    frameworkName: string;
}

export function generateUpdateEmail({ version, changelog, frameworkName }: UpdateInfo): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${frameworkName} Update</h1>
            <h2>Version ${version}</h2>
          </div>
          <div class="content">
            <h3>What's New</h3>
            <div>${changelog}</div>
          </div>
          <div class="footer">
            <p>You received this email because you subscribed to ${frameworkName} updates.</p>
          </div>
        </div>
      </body>
    </html>
  `;
} 