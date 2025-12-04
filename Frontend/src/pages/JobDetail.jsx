import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { MapPin, Briefcase, DollarSign, Clock, Building } from 'lucide-react';
import { API_BASE_URL } from '../config/config';

import { useToast } from '../context/ToastContext';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');
    const { addToast } = useToast();

    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        const fetchJobAndStatus = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/jobs/${id}`);
                setJob(res.data);

                if (userType === 'employee') {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const statusRes = await axios.get(`${API_BASE_URL}/applications/check/${id}`, {
                            headers: { 'x-auth-token': token }
                        });
                        setHasApplied(statusRes.data.hasApplied);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchJobAndStatus();
    }, [id, userType]);

    const handleApply = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login/employee');
            return;
        }
        if (userType !== 'employee') {
            addToast('Only job seekers can apply.', 'error');
            return;
        }

        setApplying(true);
        try {
            await axios.post(`${API_BASE_URL}/applications/${id}`, {}, {
                headers: { 'x-auth-token': token }
            });
            addToast('Application submitted successfully!', 'success');
            setHasApplied(true);
            // navigate('/employee/dashboard'); // Optional: stay on page to see "Applied" status
        } catch (err) {
            console.error(err);
            addToast(err.response?.data?.msg || 'Error applying to job', 'error');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!job) return <div className="min-h-screen flex items-center justify-center">Job not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <Building className="w-5 h-5 mr-2" />
                                    <span className="font-medium text-lg">{job.employer?.company?.name}</span>
                                </div>
                            </div>
                            {job.employer?.company?.logo && (
                                <img src={job.employer.company.logo} alt="Logo" className="w-20 h-20 object-contain rounded" />
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                <MapPin className="w-4 h-4 mr-2" /> {job.location}
                            </div>
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                <Briefcase className="w-4 h-4 mr-2" /> {job.type}
                            </div>
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                <DollarSign className="w-4 h-4 mr-2" /> {job.salary || 'Not disclosed'}
                            </div>
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                <Clock className="w-4 h-4 mr-2" /> Posted {new Date(job.postedAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                            <p className="text-gray-700 whitespace-pre-line mb-8">{job.description}</p>

                            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <button
                                    onClick={handleApply}
                                    disabled={applying || hasApplied}
                                    className={`w-full md:w-auto px-8 py-3 rounded-md font-bold text-white transition-colors
                    ${applying || hasApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700'}`}
                                >
                                    {applying ? 'Applying...' : hasApplied ? 'Applied' : 'Apply Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
