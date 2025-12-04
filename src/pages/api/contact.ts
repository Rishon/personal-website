import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, subject, message, captchaToken } = req.body;

    if (!name || !email || !subject || !message || !captchaToken) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const isCaptchaValid = await validateCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({ error: "Captcha validation failed" });
    }

    const mailHost = process.env.MAIL_HOST;
    const mailPort = process.env.MAIL_PORT;
    const mailUser = process.env.MAIL_USERNAME;
    const mailPass = process.env.MAIL_PASSWORD;
    const mailSecure = process.env.MAIL_SECURE;

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailSecure,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    try {
      const mailOptions = {
        from: mailUser,
        to: mailUser,
        subject: "[rishon.systems] New submission from contact form",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #4CAF50; text-align: center;">New submission</h1>
      <p style="font-size: 14px; color: #777;">You have received a new submission from the contact form on your website.</p>
      <h2 style="color: #4CAF50;">Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function validateCaptcha(token: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY ?? "",
      response: token
    });

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    const result = await res.json();
    return result.success === true;
  } catch (error) {
    console.error("Error validating captcha:", error);
    return false;
  }
}

