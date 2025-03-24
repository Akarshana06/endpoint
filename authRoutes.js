const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();



router.post('/register', async (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;