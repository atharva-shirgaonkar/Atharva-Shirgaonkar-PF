const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullname, email, message } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'atharva10711@gmail.com', // Replace with your email
        pass: 'Oppo', // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: email,
      to: 'atharva10711@gmail.com', // Replace with your email
      subject: `New Contact Form Submission from ${fullname}`,
      text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}