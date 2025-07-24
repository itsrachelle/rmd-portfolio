import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./sendgrid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;

      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
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
      const emailSent = await sendEmail({
        to: 'itsrachellenaomi@gmail.com',
        from: 'noreply@yourwebsite.com', // This needs to be a verified sender in SendGrid
        subject: emailSubject,
        text: emailText,
        html: emailHtml
      });

      if (emailSent) {
        res.json({ success: true, message: "Message sent successfully!" });
      } else {
        res.status(500).json({ error: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
