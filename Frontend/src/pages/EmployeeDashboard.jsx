import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search, MapPin, Briefcase, ChevronDown, Bell, MessageSquare,
    Filter, X, ChevronRight, Download, Star, CheckCircle, Clock
} from 'lucide-react';
import { API_BASE_URL } from '../config/config';

const DashboardNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-primary leading-none">apna</span>
                                <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 mt-0.5 rounded-full"></div>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center space-x-6">
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Jobs <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Job Prep <span className="ml-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                            </button>
                            <button className="text-gray-700 font-medium text-sm hover:text-primary">
                                Contests
                            </button>
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Degree <span className="ml-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                            </button>
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Resume Tools <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer border border-gray-200 rounded-full px-2 py-1 hover:bg-gray-50"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <img
                                src="https://placehold.co/100x100/3b82f6/ffffff?text=BV"
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'User'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const FilterSidebar = ({ filters, setFilters, onFilterChange }) => {
    const handleDateFilterChange = (value) => {
        const newFilters = { ...filters, datePosted: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-700" />
                    <h3 className="font-bold text-gray-900">Filters</h3>
                </div>
                <button 
                    onClick={() => {
                        const newFilters = { title: '', location: '', experience: '', datePosted: 'all' };
                        setFilters(newFilters);
                        onFilterChange(newFilters);
                    }}
                    className="text-sm text-gray-500 hover:text-primary font-medium"
                >
                    Clear all
                </button>
            </div>

            {/* Date Posted */}
            <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-900 text-sm">Date posted</h4>
                    <ChevronDown className="w-4 h-4 text-gray-400 rotate-180" />
                </div>
                <div className="space-y-2">
                    {['all', '24h', '3d', '7d'].map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.datePosted === option ? 'border-teal-600' : 'border-gray-300'}`}>
                                {filters.datePosted === option && <div className="w-2 h-2 bg-teal-600 rounded-full"></div>}
                            </div>
                            <span className="text-sm text-gray-700">
                                {option === 'all' ? 'All' : 
                                 option === '24h' ? 'Last 24 hours' : 
                                 option === '3d' ? 'Last 3 days' : 'Last 7 days'}
                            </span>
                            <input 
                                type="radio" 
                                name="datePosted" 
                                value={option} 
                                checked={filters.datePosted === option} 
                                onChange={() => handleDateFilterChange(option)} 
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

const JobCard = ({ job }) => {
    return (
        <Link to={`/jobs/${job._id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg border border-gray-100 p-1 flex items-center justify-center bg-white shadow-sm">
                        <img
                            src={job.employer?.company?.logo || "https://placehold.co/48x48/png?text=L"}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.employer?.company?.name || 'Company Name'}</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">₹ {job.salary}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {job.type}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Min. 2 years
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Good (Intermediate / Advanced)
                </span>
            </div>
        </Link>
    );
};

const EmployeeDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        title: '',
        location: '',
        experience: '',
        datePosted: 'all'
    });
    const navigate = useNavigate();

    const fetchJobs = async (currentFilters = filters) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            if (currentFilters.title) queryParams.append('title', currentFilters.title);
            if (currentFilters.location) queryParams.append('location', currentFilters.location);
            if (currentFilters.datePosted && currentFilters.datePosted !== 'all') queryParams.append('datePosted', currentFilters.datePosted);
            // Experience is not yet supported by backend fully but we send it anyway
            if (currentFilters.experience) queryParams.append('experience', currentFilters.experience);

            const res = await axios.get(`${API_BASE_URL}/jobs?${queryParams.toString()}`);
            setJobs(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                const userRes = await axios.get(`${API_BASE_URL}/users/me`, config);
                setUser(userRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
        fetchJobs();
    }, []);

    const handleSearch = () => {
        fetchJobs();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <DashboardNavbar user={user} />

            {/* Search Bar Strip */}
            <div className="bg-white border-b border-gray-200 py-4 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <Search className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Frontend Developer"
                                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full text-sm"
                                value={filters.title}
                                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                            />
                            {filters.title && (
                                <X 
                                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                                    onClick={() => setFilters({ ...filters, title: '' })}
                                />
                            )}
                        </div>
                        <div className="w-full md:w-48 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="3 years"
                                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full text-sm"
                                value={filters.experience}
                                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                            />
                            {filters.experience && (
                                <X 
                                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                                    onClick={() => setFilters({ ...filters, experience: '' })}
                                />
                            )}
                        </div>
                        <div className="flex-[1.5] flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="HSR Layout, Bengaluru/Bangalore"
                                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full text-sm"
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            />
                            {filters.location && (
                                <X 
                                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                                    onClick={() => setFilters({ ...filters, location: '' })}
                                />
                            )}
                        </div>
                        <button 
                            onClick={handleSearch}
                            className="bg-teal-700 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-teal-800 transition-colors w-full md:w-auto"
                        >
                            Search jobs
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Showing {jobs.length} jobs based on your filters</h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar - Filters */}
                    <div className="col-span-1 lg:col-span-3">
                        <FilterSidebar filters={filters} setFilters={setFilters} onFilterChange={fetchJobs} />
                    </div>

                    {/* Center - Job List */}
                    <div className="col-span-1 lg:col-span-6 space-y-4">
                        {jobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-1 lg:col-span-3 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 relative">
                                <img
                                    src="https://placehold.co/100x100/3b82f6/ffffff?text=BV"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                                />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{user?.name || 'User Name'}</h3>
                            <p className="text-gray-500 text-sm mb-1">{user?.profile?.position || 'Position not set'}</p>
                            <p className="text-gray-400 text-xs mb-4">{user?.profile?.company || 'Company not set'}</p>
                            <button 
                                onClick={() => navigate('/profile')}
                                className="w-full border border-teal-600 text-teal-700 font-bold py-2 rounded-lg hover:bg-teal-50 transition-colors text-sm"
                            >
                                Update profile
                            </button>
                        </div>

                        {/* Track Applications */}
                        <div className="bg-[#dcfce7] rounded-xl p-6 flex justify-between items-center">
                            <div>
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 text-teal-700 shadow-sm">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h4 className="text-teal-900 font-medium text-sm">Track your</h4>
                                <h3 className="text-teal-900 font-bold text-lg">Job Applications</h3>
                            </div>
                            <button 
                                onClick={() => navigate('/track')}
                                className="bg-teal-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center hover:bg-teal-800"
                            >
                                Track <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>

                        {/* Download App */}
                        <div className="bg-[#fdf4ff] rounded-xl p-6 border border-purple-100">
                            <h3 className="text-purple-900 font-bold text-lg mb-4">Download Apna App</h3>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    Unlimited job applications
                                </li>
                                <li className="flex items-center text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    Connect with HRs, directly
                                </li>
                                <li className="flex items-center text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    Track your Applications
                                </li>
                            </ul>
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-1 text-purple-700 font-bold text-xl">
                                    <Star className="w-5 h-5 fill-purple-700" /> 4.7
                                </div>
                                <img
                                    src="https://placehold.co/60x100/3b82f6/ffffff?text=Phone"
                                    alt="App"
                                    className="h-20 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
