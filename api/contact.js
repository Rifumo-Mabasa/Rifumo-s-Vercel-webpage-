export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // The data comes from req.body, NOT from document.getElementById
        const { name, email, message } = req.body;

        // Validating that data exists
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // LOGGING: This will show up in your Vercel Dashboard Logs
        console.log(`New Message from ${name}: ${message}`);

        // SUCCESS RESPONSE
        return res.status(200).json({ 
            message: "Success! Your message was received by the server." 
        });
        
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}