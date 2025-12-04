import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/config';
import { ChevronLeft, Building, MapPin, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

const TrackApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get(`${API_BASE_URL}/applications/employee/me`, config);
                setApplications(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchApplications();
    }, [navigate]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'shortlisted': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'hired': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'applied': return <Clock className="w-4 h-4" />;
            case 'shortlisted': return <CheckCircle className="w-4 h-4" />;
            case 'hired': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Applications</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {applications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Building className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-500 mb-6">Start applying to jobs to track them here.</p>
                        <button 
                            onClick={() => navigate('/employee/dashboard')}
                            className="bg-teal-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-800 transition-colors"
                        >
                            Browse Jobs
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div key={app._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg border border-gray-100 p-1 flex items-center justify-center bg-white shadow-sm">
                                            <img
                                                src={app.job?.employer?.company?.logo || "https://placehold.co/48x48/png?text=L"}
                                                alt="Logo"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{app.job?.title || 'Job Title Unavailable'}</h3>
                                            <p className="text-sm text-gray-500">{app.job?.employer?.company?.name || 'Company Name Unavailable'}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(app.status)}`}>
                                        {getStatusIcon(app.status)}
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-50 pt-4 mt-2">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {app.job?.location || 'Location N/A'}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackApplications;
