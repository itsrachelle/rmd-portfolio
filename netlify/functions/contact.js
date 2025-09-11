const { MailService } = require('@sendgrid/mail');

const mailService = new MailService();
mailService.setApiKey(process.env.Test);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { firstName, lastName, email, message } = JSON.parse(event.body);

    if (!firstName || !lastName || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Create email content
    const emailSubject = `New Contact Form Message from ${firstName} ${lastName}`;
    const emailText = `
Name: ${firstName} ${lastName}
Email: ${email}
Message: ${message}
    `;
    
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send email using SendGrid
    await mailService.send({
      to: 'thewebstudio.live@gmail.com',
      from: 'thewebstudio.live@gmail.com',
      subject: emailSubject,
      text: emailText,
      html: emailHtml
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ success: true, message: 'Message sent successfully!' })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Failed to send message. Please try again.' })
    };
  }
};