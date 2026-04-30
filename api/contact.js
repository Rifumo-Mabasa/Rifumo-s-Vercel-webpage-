import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    // 1. Create a "Transporter" (The mailman)
    // This example uses Gmail. 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your gmail
            pass: process.env.EMAIL_PASS  // Your App Password (not your login password)
        }
    });

    try {
        // 2. Set up the Email content
        const mailOptions = {
            from: email, 
            to: process.env.EMAIL_USER, // Where you want to receive the mail
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        // 3. Send it!
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Message sent to inbox!" });
    } catch (error) {
        console.error("Email Error:", error);
        return res.status(500).json({ message: "Failed to send email." });
    }
}