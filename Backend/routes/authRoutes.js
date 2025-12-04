const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Employer Register
router.post('/register/employer', async (req, res) => {
    try {
        const { name, email, password, companyName } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            userType: 'employer',
            name,
            email,
            password: hashedPassword,
            company: { name: companyName }
        });

        await user.save();

        const payload = { user: { id: user.id, type: 'employer' } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Employer Login (Send OTP)
router.post('/login/employer', async (req, res) => {
    try {
        const { phone } = req.body;
        // Mock sending OTP
        res.json({ msg: 'OTP sent', phone, otp: '123456' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Employee Login (Send OTP - Mock)
router.post('/login/employee', async (req, res) => {
    try {
        const { phone } = req.body;
        res.json({ msg: 'OTP sent', phone, otp: '123456' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Verify OTP (Common for both)
router.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp, userType } = req.body;
        console.log('Verify OTP Request:', { phone, otp, userType });

        // Basic input validation
        if (!phone || typeof phone !== 'string') {
            return res.status(400).json({ msg: 'Phone is required' });
        }
        if (!otp || typeof otp !== 'string') {
            return res.status(400).json({ msg: 'OTP is required' });
        }

        // Mock OTP check
        if (otp !== '123456') {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        // If DB is not connected, provide a safe fallback (dev mode)
        const dbConnected = require('mongoose').connection.readyState === 1;
        let user = null;
        if (dbConnected) {
            user = await User.findOne({ phone });
        }

        if (dbConnected && !user) {
            // Create new user if not exists
            user = new User({
                userType: userType || 'employee', // Default to employee if not specified
                phone
            });
            await user.save();
            console.log('New user created:', user);
        } else if (user) {
            // If user exists, check if the userType matches (optional validation)
            // Or update userType if needed? 
            // For now, we assume a phone number belongs to one type of user or we just log them in.
            // If we want to enforce roles:
            if (userType && user.userType !== userType) {
                 // If a user tries to login as employer but is registered as employee, what to do?
                 // For this simple task, we might just allow it or update it.
                 // Let's just proceed.
            }
        }

        const payload = { user: { id: user ? user.id : phone, type: user ? user.userType : (userType || 'employee') } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' }, (err, token) => {
            if (err) {
                console.error('JWT sign error:', err);
                return res.status(500).json({ msg: 'Token generation failed' });
            }
            res.json({ token, user });
        });
    } catch (err) {
        console.error('verify-otp error:', err);
        const message = err?.message || 'Server Error';
        res.status(500).json({ msg: message });
    }
});

module.exports = router;
