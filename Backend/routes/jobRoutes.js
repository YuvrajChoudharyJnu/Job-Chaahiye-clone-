const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');

// Create Job (Employer only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employer') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const { title, description, category, location, salary, type, requirements } = req.body;

        const newJob = new Job({
            employer: req.user.id,
            title,
            description,
            category,
            location,
            salary,
            type,
            requirements
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get All Jobs (Public) with Filters
router.get('/', async (req, res) => {
    try {
        const { title, location, datePosted, experience } = req.query;
        let query = {};

        if (title) {
            query.$or = [
                { title: { $regex: title, $options: 'i' } },
                { description: { $regex: title, $options: 'i' } },
                { category: { $regex: title, $options: 'i' } }
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (datePosted && datePosted !== 'all') {
            const now = new Date();
            let days = 0;
            if (datePosted === '24h') days = 1;
            else if (datePosted === '3d') days = 3;
            else if (datePosted === '7d') days = 7;

            if (days > 0) {
                const pastDate = new Date(now.setDate(now.getDate() - days));
                query.postedAt = { $gte: pastDate };
            }
        }

        // Note: Experience is not a standard field in the Job model yet, 
        // but if it were, we would filter here. 
        // For now, we'll ignore it or add a placeholder check if you add the field later.

        const jobs = await Job.find(query).sort({ postedAt: -1 }).populate('employer', 'company.name company.logo');
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'company.name company.logo company.description company.website');
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Job not found' });
        res.status(500).send('Server Error');
    }
});

// Get Employer's Jobs
router.get('/employer/jobs', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employer') {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        const jobs = await Job.find({ employer: req.user.id }).sort({ postedAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
