const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));  // Serve static files (frontend)
app.use(express.json());           // To parse JSON request bodies

// Set up Multer for image uploads
const upload = multer({
    dest: 'uploads/', // Uploads directory
    limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB file size
});

// Serve the frontend (HTML, CSS, JS files)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Construct the URL for the uploaded image
    const imageUrl = '/uploads/' + req.file.filename;
    res.json({ imageUrl });
});

// Route to save email data
app.post('/api/email/save', (req, res) => {
    const { subject, body, quote, imageUrl } = req.body;
    const emailData = { subject, body, quote, imageUrl };

    // Save email data to a file (or database)
    const filePath = path.join(__dirname, 'emails', `${Date.now()}.json`);
    fs.writeFile(filePath, JSON.stringify(emailData), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving email.' });
        }
        res.json({ message: 'Email saved successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
