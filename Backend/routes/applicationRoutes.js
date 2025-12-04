const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');
router.post('/:jobId', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employee') {
            return res.status(401).json({ msg: 'Only employees can apply' });
        }

        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        const existingApplication = await Application.findOne({ job: req.params.jobId, applicant: req.user.id });
        if (existingApplication) {
            return res.status(400).json({ msg: 'Already applied to this job' });
        }

        const application = new Application({
            job: req.params.jobId,
            applicant: req.user.id
        });

        await application.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/check/:jobId', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employee') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const existingApplication = await Application.findOne({ 
            job: req.params.jobId, 
            applicant: req.user.id 
        });

        res.json({ hasApplied: !!existingApplication });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/employee/me', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employee') {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        const applications = await Application.find({ applicant: req.user.id })
            .populate({
                path: 'job',
                populate: { path: 'employer', select: 'company.name company.logo' }
            })
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/job/:jobId', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employer') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        if (job.employer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('applicant', 'name email phone profile')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/:id/status', auth, async (req, res) => {
    try {
        if (req.user.type !== 'employer') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('job');

        if (!application) return res.status(404).json({ msg: 'Application not found' });

        if (application.job.employer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        application.status = status;
        await application.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
