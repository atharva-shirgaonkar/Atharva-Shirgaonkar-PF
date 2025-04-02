const nodemailer = require('nodemailer');
require('dotenv').config(); // For local testing

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullname, email, message } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS, // Use environment variable for password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Send to your email
      subject: `New Contact Form Submission from ${fullname}`,
      text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}