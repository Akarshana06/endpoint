const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;


app.use(express.json());
require('dotenv').config();  

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected to Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
