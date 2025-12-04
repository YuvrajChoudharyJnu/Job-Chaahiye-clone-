import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
    const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType'); 
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    // Refs for dropdowns
    const jobsDropdownRef = useRef(null);
    const careerDropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (jobsDropdownRef.current && !jobsDropdownRef.current.contains(event.target)) {
                setJobsDropdownOpen(false);
            }
            if (careerDropdownRef.current && !careerDropdownRef.current.contains(event.target)) {
                setCareerDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        
        <header className="main-header header-style-three bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="main-box md:gap-x-24 !pl-0 md:!pl-11 flex justify-between items-center h-20">
                <div className="nav-outer flex items-center">
                    <div className="logo-box">
                        <div className="flex md:ml-4">
                            <div className="block md:hidden mr-3">
                                <a 
                                    href="#" 
                                    className="mobile-nav-toggler h-2 w-2 p-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(!isOpen);
                                    }}
                                >
                                    <span className="flaticon-menu-1">
                                        <Menu className="h-5 w-5 text-gray-700" />
                                    </span>
                                </a>
                            </div>
                            <Link to="/" className="flex items-center">
                                <img 
                                    src="https://employer.jobchaahiye.com/images/logo.png" 
                                    alt="Job Chaahiye" 
                                    className="img-fluid w-8 md:w-full md:ml-2 mr-6" 
                                    style={{maxWidth: '50px'}}
                                />
                            </Link>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <nav className="nav main-menu">
                            <ul className="navigation flex space-x-8" id="navbar">
                                {/* Find Jobs Dropdown */}
                                <li className="dropdown has-mega-menu relative" id="has-mega-menu" ref={jobsDropdownRef}>
                                    <div>
                                        <button 
                                            className="dropdown-toggle font-[500] text-gray-800 hover:text-blue-500"
                                            type="button" 
                                            id="dropdownMenuButton2"
                                            onClick={() => {
                                                setJobsDropdownOpen(!jobsDropdownOpen);
                                                setCareerDropdownOpen(false);
                                            }}
                                            onMouseEnter={() => {
                                                setJobsDropdownOpen(true);
                                                setCareerDropdownOpen(false);
                                            }}
                                        >
                                            Find Jobs
                                        </button>
                                        
                                        {jobsDropdownOpen && (
                                            <ul 
                                                className="dropdown-menu flex-row absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                                                aria-labelledby="dropdownMenuButton2" 
                                                id="jobs-dropdown"
                                                onMouseEnter={() => setJobsDropdownOpen(true)}
                                                onMouseLeave={() => setJobsDropdownOpen(false)}
                                                style={{width: '700px'}}
                                            >
                                                <div className="flex p-4">
                                                    <div>
                                                        {[
                                                            "Work From Home Jobs",
                                                            "Part Time Jobs",
                                                            "Freshers Jobs",
                                                            "Jobs for women",
                                                            "Full Time Jobs",
                                                            "Night Shift Jobs",
                                                            "International Jobs"
                                                        ].map((job, index) => (
                                                            <div key={index} className="px-20 py-1">
                                                                <div className="text-nowrap w-[10vw] m-2 hover:scale-105 duration-100 hover:font-[500]">
                                                                    <a className="text-[#030713] hover:text-blue-500" href="/jobs">
                                                                        {job}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="h-auto bg-stone-200 w-[1px]"></div>
                                                    <div>
                                                        {[
                                                            "Jobs By City",
                                                            "Jobs By Department",
                                                            "Jobs By Company",
                                                            "Jobs By Qualification",
                                                            "Others"
                                                        ].map((category, index) => (
                                                            <div key={index} className="mx-10 my-3 dropdown dropdown-right dropdown-end">
                                                                <button type="button" className="px-4 text-nowrap" tabIndex={index} role="button">
                                                                    <span className="text-[#030713] hover:text-blue-500 hover:font-[500]">
                                                                        {category}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </ul>
                                        )}
                                    </div>
                                </li>

                                {/* Career Compass Dropdown */}
                                <li className="dropdown relative" ref={careerDropdownRef}>
                                    <div>
                                        <button 
                                            className="dropdown-toggle text-gray-800 hover:text-blue-500"
                                            type="button" 
                                            id="dropdownMenuButton1"
                                            onClick={() => {
                                                setCareerDropdownOpen(!careerDropdownOpen);
                                                setJobsDropdownOpen(false);
                                            }}
                                            onMouseEnter={() => {
                                                setCareerDropdownOpen(true);
                                                setJobsDropdownOpen(false);
                                            }}
                                        >
                                            Career Compass
                                        </button>
                                        
                                        {careerDropdownOpen && (
                                            <ul 
                                                className="dropdown-menu r absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                                                aria-labelledby="dropdownMenuButton1" 
                                                id="career-dropdown"
                                                onMouseEnter={() => setCareerDropdownOpen(true)}
                                                onMouseLeave={() => setCareerDropdownOpen(false)}
                                                style={{width: '800px'}}
                                            >
                                                <div className="flex flex-row h-auto p-4">
                                                    <div className="h-auto">
                                                        {[
                                                            {
                                                                title: "AI Resume Builder",
                                                                description: "Create your best resume with AI"
                                                            },
                                                            {
                                                                title: "AI Resume Checker",
                                                                description: "Get instant resume feedback"
                                                            },
                                                            {
                                                                title: "AI Cover Letter Generator",
                                                                description: "Stand out and get hired"
                                                            },
                                                            {
                                                                title: "AI Interview (Coming soon)",
                                                                description: "Your strategy to success"
                                                            },
                                                            {
                                                                title: "Your Strategy to Success Blog",
                                                                description: "Guidance for securing dream job"
                                                            }
                                                        ].map((item, index) => (
                                                            <div key={index} className="flex py-2 gap-2 px-4 mx-2 hover:bg-blue-200">
                                                                <span className="w-10 h-10 p-4 bg-red-50 flex-shrink-0"></span>
                                                                <div className="flex flex-col mt-1">
                                                                    <h4 className="text-[16px] font-medium text-nowrap">{item.title}</h4>
                                                                    <p className="text-sm">{item.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="h-auto bg-stone-200 w-[1px]"></div>
                                                    <div>
                                                        <div className="bg-base-100 h-full">
                                                            <figure className="w-[16vw] h-32 rounded-lg bg-red-200 mt-4 mx-4"></figure>
                                                            <div className="card-body">
                                                                <p className="ml-7">Level up your resume: Watch our career compass video guide.</p>
                                                                <div className="card-actions ml-7 mt-4 text-green-700 justify-end">
                                                                    <button className="">Watch video →</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        )}
                                    </div>
                                </li>

                                {/* Blog Link */}
                                <li className="dropdown">
                                    <Link to="/blog-list-v1" className="text-gray-800 hover:text-blue-500">
                                        <span>Blog</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Right side buttons */}
                <div className="outer-box md:mr-4">
                    <div className="btn-box flex items-center">
                        {!token ? (
                            <>
                                {/* Desktop buttons - EXACTLY like HTML */}
                                <a 
                                    className="theme-btn btn-style-three call-modal hidden md:block text-[#1967d2] border border-[#1967d2] px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#1967d2] hover:text-white transition-colors"
                                    href="https://employer.jobchaahiye.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Employer Login
                                </a>
                                <Link 
                                    to="/login/employee"
                                    className="theme-btn btn-style-seven relative z-10 cursor-pointer !ml-4 hidden md:block bg-[#1967d2] text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#1557b8]"
                                >
                                    Login
                                </Link>
                                
                                {/* Mobile buttons - EXACTLY like HTML */}
                                <a 
                                    className="px-2 h-16 flex justify-center items-center text-sm md:hidden text-[#1967d2] font-medium mr-3"
                                    href="https://employer.jobchaahiye.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Employer Login
                                </a>
                                <Link 
                                    to="/login/employee"
                                    className="py-1 flex justify-center items-center text-sm w-[100px] md:hidden rounded-sm text-white bg-[#1967d2] font-medium"
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to={userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard'} 
                                    className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 md:hidden"
                >
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
                        <div className="pro-header flex justify-between items-center p-4 border-b">
                            <Link to="/" onClick={() => setIsOpen(false)}>
                                <img 
                                    src="https://employer.jobchaahiye.com/images/logo.png" 
                                    alt="Job Chaahiye" 
                                    className="img-fluid"
                                    style={{maxWidth: '50px'}}
                                />
                            </Link>
                            <button 
                                className="fix-icon p-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
                            {/* Jobs Section */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center py-3 border-b">
                                    <span className="font-medium text-gray-800">Jobs</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                                <div className="pl-4 mt-2">
                                    <div className="text-sm text-gray-600 mb-2 font-medium">Jobs By Type</div>
                                    {[
                                        "Work From Home Jobs",
                                        "Part Time Jobs",
                                        "Freshers Jobs",
                                        "Women Jobs",
                                        "Full Time Jobs",
                                        "Night Shift Jobs",
                                        "International Jobs"
                                    ].map((job, index) => (
                                        <div key={index} className="py-1.5 text-gray-700 text-sm">
                                            {job}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Career Compass */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center py-3 border-b">
                                    <span className="font-medium text-gray-800">Career Compass</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                                <div className="pl-8 mt-2">
                                    {["Resume Builder", "Cover Letter", "Resume Checker", "Blogs"].map((item, index) => (
                                        <div key={index} className="py-2 text-gray-700">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Community */}
                            <div className="mb-6">
                                <div className="ml-5 text-gray-800 font-medium">Community</div>
                                <div className="ml-5 mt-2 text-gray-600 text-sm">Free jobs alerts on WhatsApp</div>
                            </div>
                            
                            <div className="divide h-[1px] mt-3 bg-gray-300"></div>
                            
                            {/* Contact & App */}
                            <div className="mt-3">
                                <div className="ml-5 text-gray-800 font-medium">Contact Us</div>
                                <div className="ml-5 mt-2 text-gray-600 text-sm">Download Our App</div>
                            </div>
                            
                            {/* Login Options */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center py-3 border-b">
                                    <span className="font-medium text-gray-800">login</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                                <div className="ml-5 mt-2">
                                    {!token ? (
                                        <>
                                            <div 
                                                className="mt-2 text-gray-700 py-1.5 cursor-pointer"
                                                onClick={() => {
                                                    navigate('/login/employee');
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Candidate
                                            </div>
                                            <a 
                                                href="https://employer.jobchaahiye.com/"
                                                className="mt-2 text-black py-1.5 block"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Employer
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <div 
                                                className="text-gray-700 py-1.5 cursor-pointer"
                                                onClick={() => {
                                                    navigate(userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard');
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Dashboard
                                            </div>
                                            <div 
                                                className="text-red-600 py-1.5 cursor-pointer"
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Logout
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
