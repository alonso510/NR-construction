const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received message:', { name, email, message });
    
    // Here you would typically save the message to a database or send an email
    // For now, we'll just send a success response
    res.json({ success: true, message: 'Message received successfully!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});