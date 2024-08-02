const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'nrconstructionmailer@gmail.com', 
        pass: 'qzvsiaoolbkrvuhy'   
    }
});

// Routes
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received message:', { name, email, message });

    // Email options
    const mailOptions = {
        from: 'nrconstructionmailer@gmail.com',
        to: 'nrconstructionllc22@gmail.com', // Sending to the same email
        subject: 'New Contact Message',
        text: `Business Inquiry from ${name} (${email}):\n\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Message received and email sent successfully!' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
