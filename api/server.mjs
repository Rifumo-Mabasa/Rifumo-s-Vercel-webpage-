import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // 1. Only allow POST requests (Vercel functions handle all methods by default)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // 2. Destructure data from the request body
    const { name, email, message } = req.body;

    // Logging for Vercel Dashboard debugging
    console.log("Attempting to send mail from:", email);

    // 3. Create the transporter (Using your exact logic)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS  
        },
        tls: {
            rejectUnauthorized: false 
        }
    });

    // 4. Define the email options
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        replyTo: email,               
        to: process.env.EMAIL_USER,
        subject: `Portfolio Message from ${name}`,
        text: `From: ${name} <${email}>\n\nMessage:\n${message}`
    };

    // 5. Execution using Try/Catch
    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        // Use .json() for better compatibility with your frontend fetch
        return res.status(200).json({ message: "Message Sent Successfully!" });
    } catch (error) {
        console.error("❌ THE REAL ERROR IS:", error);
        return res.status(500).json({ error: "Error sending message." });
    }
}