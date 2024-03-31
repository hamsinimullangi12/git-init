// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for MongoDB connection errors
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Create User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files (HTML and CSS)
app.use(express.static('public'));

// Route to handle user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error registering new user');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
