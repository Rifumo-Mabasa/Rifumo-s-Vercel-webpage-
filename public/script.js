/**
 * THEME MANAGEMENT
 */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/**
 * CONTACT FORM HANDLING
 */
const contactForm = document.getElementById('contact-form');
const responseMsg = document.getElementById('response-msg'); 

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. UI Feedback: Disable button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        
        if (responseMsg) {
            responseMsg.innerText = "Sending your message...";
            responseMsg.style.color = "orange";
        }
        
        submitBtn.textContent = "Processing...";

        // 2. Data Collection
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            /** 
             * CRITICAL CHANGE: 
             * Updated endpoint from '/send-contact' to '/api/contact' 
             * to match the Vercel serverless function path.
             */
            const response = await fetch('/api/contact', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (responseMsg) {
                    responseMsg.innerText = "🚀 Message sent successfully!";
                    responseMsg.style.color = "green";
                }
                contactForm.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Server error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            if (responseMsg) {
                responseMsg.innerText = "❌ Oops! Something went wrong. Please try again.";
                responseMsg.style.color = "red";
            }
        } finally {
            // 3. Reset Button State
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}