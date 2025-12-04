const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get Current User Profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Profile (Employee/Employer)
router.put('/profile', auth, async (req, res) => {
    try {
        const {
            name,
            skills, experience, education, resume, location, // Employee fields
            companyName, description, website, logo // Employer fields
        } = req.body;

        console.log('Update Profile Request Body:', req.body);

        const user = await User.findById(req.user.id);
        console.log('User before update:', user);

        if (name) user.name = name;

        if (user.userType === 'employee') {
            if (!user.profile) user.profile = {};
            if (skills) user.profile.skills = Array.isArray(skills) ? skills.filter(s => s) : skills;
            if (experience) user.profile.experience = experience;
            if (education) user.profile.education = education;
            if (resume) user.profile.resume = resume;
            if (location) user.profile.location = location;
            if (req.body.company) user.profile.company = req.body.company;
            if (req.body.position) user.profile.position = req.body.position;
        } else if (user.userType === 'employer') {
            if (!user.company) user.company = {};
            if (companyName) user.company.name = companyName;
            if (description) user.company.description = description;
            if (website) user.company.website = website;
            if (logo) user.company.logo = logo;
            if (location) user.company.location = location;
        }

        await user.save();
        console.log('User saved successfully:', user);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
