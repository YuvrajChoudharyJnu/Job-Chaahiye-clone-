import axios from 'axios';
import { ChevronRight, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../config/config';
import { useToast } from '../context/ToastContext';

const LoginEmployer = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); 
    const navigate = useNavigate();
    const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
    const [showLoginBtn, setShowLoginBtn] = useState(false);
    const statsRef = useRef(null);
    const { addToast } = useToast();

    const testimonials = [
        {
            title: "Finding Talent Made Easy",
            text: "Finding the right talent used to be a headache. Now, thanks to Job chaahiye, it's a breeze! We've been consistently impressed with the quality of candidates we've found through their platform",
            name: "Priyanka Sharma",
            role: "HR Manager, E-commerce Startup",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            title: "A Revelation",
            text: "Honestly, I was skeptical about trying a new job portal. But Job chaahiye has been a revelation. The platform is user-friendly, the search filters are excellent, and we've filled several key positions with their help.",
            name: "Rajesh Kumar",
            role: "Head of Talent Acquisition, Manufacturing Company",
            img: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            title: "More Than a Job Board",
            text: "Job chaahiye is more than just a job board - it's a community. We've connected with some fantastic candidates through their platform, and the engagement has been great.",
            name: "Aarti Patel",
            role: "Founder, Marketing Agency",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            title: "Targeted Advertising",
            text: "Job chaahiye's targeted advertising has been amazing. We've been able to reach the right people for our specific needs, and the quality of applicants has been fantastic.",
            name: "Sunita Devi",
            role: "Talent Acquisition Specialist, IT Firm",
            img: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            title: "Lifesaver in Hiring",
            text: "Hiring used to be a time-consuming process. Job chaahiye has streamlined everything for us. We can easily post new positions and manage applications.",
            name: "Vikram Malhotra",
            role: "HR Director, Healthcare Provider",
            img: "https://randomuser.me/api/portraits/men/11.jpg"
        }
    ];

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemsPerPage = isMobile ? 1 : 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: "How can I request for a demo session?",
            answer: "To request a demo session, navigate to the demo request page accessible through the main menu. Fill out the form with your details and submit. Our team will contact you to schedule the session."
        },
        {
            question: "How can I make payment?",
            answer: "After successful registration or sign in, select your preferred plan and you will be redirected to the payment page. You can check your order details and make payment through money wallets and bank accounts. Once your payment is successfully made, you can start hiring candidates."
        },
        {
            question: "How can I get customized plan basis my requirement?",
            answer: "For customized plans, please contact our support team with your specific requirements. We will review your needs and provide a tailored plan that best suits your business."
        },
        {
            question: "What should I do if my payment failed and money deducted from my bank account?",
            answer: "If your payment fails but the money has been deducted from your account, please contact our customer support with the transaction details. We will verify the transaction and process a refund or complete your order as necessary."
        }
    ];

    useEffect(() => {
        setCurrentTestimonialPage(0);
    }, [totalPages]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonialPage((prev) => (prev + 1) % totalPages);
        }, 5001);
        return () => clearInterval(interval);
    }, [totalPages]);

    useEffect(() => {
        const handleScroll = () => {
            if (statsRef.current) {
                const rect = statsRef.current.getBoundingClientRect();
                setShowLoginBtn(rect.top <= 100);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP Scroll animations
    useEffect(() => {
        // Dynamically import GSAP to avoid SSR issues
        import('gsap').then((gsapModule) => {
            const gsap = gsapModule.default;
            import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
                const ScrollTrigger = ScrollTriggerModule.default;
                gsap.registerPlugin(ScrollTrigger);

                // Animate sections on scroll
                const sections = document.querySelectorAll('.scroll-animate');
                sections.forEach((section) => {
                    gsap.fromTo(
                        section,
                        {
                            opacity: 0,
                            y: 50
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 85%',
                                end: 'bottom 20%',
                                toggleActions: 'play none none none'
                            }
                        }
                    );
                });
            });
        });
    }, []);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login/employer`, { phone: phoneNumber });
            if (res.data.otp) {
                addToast(`OTP Sent: ${res.data.otp}`, 'info');
            }
            setStep(2);
        } catch (err) {
            console.error(err);
            addToast('Error sending OTP', 'error');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { 
                phone: phoneNumber, 
                otp,
                userType: 'employer'
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userType', 'employer');
            navigate('/employer/dashboard'); 
            addToast('Login Successful!', 'success');
        } catch (err) {
            console.error(err);
            addToast('Invalid OTP', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Navbar Component */}
            <Navbar />

            {/* Additional Header Section */}
            <div className="bg-blue-50 border-b border-gray-100">
                <div className="px-4 sm:px-6 lg:px-32 py-3 flex items-center justify-between">
                    <div></div>
                    <div className="flex items-center gap-4">
                        {showLoginBtn && (
                            <button 
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Login
                            </button>
                        )}
                        <Link to="/" className="text-blue-500 text-sm hover:underline">
                            Looking for a job?
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="p-[28px] lg:pt-[80px] lg:pr-[28px] lg:pb-[28px] lg:pl-[112px]">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left scroll-animate" style={{ opacity: 0 }}>
                        <h4 className="text-[#1f8268] font-semibold tracking-wider mb-4 uppercase text-xl lg:text-4xl">INDIA'S #1 HIRING PLATFORM</h4>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                            Find the right <br className="hidden lg:block" /> candidate. Fast.
                        </h1>
                        <p className="text-[#5b5e76] opacity-[80%] text-xl lg:text-2xl font-medium">
                            Trusted by 5 Cr+ Candidates | 7 Lakh+ Employers
                        </p>
                    </div>

                    {/* Right Login Card */}
                    <div className="flex-1 w-full max-w-md">
                        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
                            <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 text-gray-800">Employer Login/Sign Up</h2>
                            {step === 1 ? (
                                <form onSubmit={handleSendOtp} className="space-y-6">
                                    <div>
                                        <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                            <div className="bg-gray-50 px-4 py-3 text-gray-600 font-medium border-r border-gray-200 flex items-center">
                                                +91
                                            </div>
                                            <input
                                                type="tel"
                                                className="flex-1 px-4 py-3 outline-none text-gray-900 placeholder-gray-400 bg-blue-50/30"
                                                placeholder="Mobile Number"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full h-[48px] bg-[#3b82f6] text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center"
                                    >
                                        Send OTP
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    <div>
                                        <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                            <input
                                                type="text"
                                                className="flex-1 px-4 py-3 outline-none text-gray-900 placeholder-gray-400 bg-blue-50/30"
                                                placeholder="Enter OTP (123456)"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full h-[48px] bg-[#3b82f6] text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center"
                                    >
                                        Verify OTP
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Company Hiring */}
            <div className="py-12 bg-white scroll-animate [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]" style={{ opacity: 0, maxWidth: '75%', margin: '0 auto' }}>
    <div className="text-center mb-10">
        <h3 className="text-[35px] font-medium text-[#02203c] mb-[10px]">Top Company Hiring</h3>
        <p className="text-[18px] font-extralight text-[#7c8e9a] mt-2">Our customers have gotten offers from awesome companies.</p>
    </div>
    <div className="overflow-hidden py-4">
        <div className="flex gap-12 animate-marquee items-center px-4">
            {[
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png"
            ].map((logo, i) => (
                <div key={i} className="w-[162px] h-[92px] flex-shrink-0">
                    <img 
                        src={logo} 
                        alt={`Company ${i}`} 
                        className="w-full h-full object-contain rounded-lg px-[20px] py-[5px] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white" 
                    />
                </div>
            ))}
            {[
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png"
            ].map((logo, i) => (
                <div key={`dup-${i}`} className="w-[162px] h-[92px] flex-shrink-0">
                    <img 
                        src={logo} 
                        alt={`Company ${i}`} 
                        className="w-full h-full object-contain rounded-lg px-[20px] py-[5px] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white" 
                    />
                </div>
            ))}
        </div>
    </div>
    <div className="overflow-hidden py-4">
        <div className="flex gap-12 animate-marquee-reverse items-center">
            {[
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/9dd55e54b5a28658bf4e.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/35e044b3354aaa0caed5.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png"
            ].map((logo, i) => (
                <div key={i} className="w-[162px] h-[92px] flex-shrink-0">
                    <img 
                        src={logo} 
                        alt={`Company Reverse ${i}`} 
                        className="w-full h-full object-contain rounded-lg px-[20px] py-[5px] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white" 
                    />
                </div>
            ))}
            {[
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/9dd55e54b5a28658bf4e.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/35e044b3354aaa0caed5.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
                "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png"
            ].map((logo, i) => (
                <div key={`dup-rev-${i}`} className="w-[162px] h-[92px] flex-shrink-0">
                    <img 
                        src={logo} 
                        alt={`Company Reverse ${i}`} 
                        className="w-full h-full object-contain rounded-lg px-[20px] py-[5px] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white" 
                    />
                </div>
            ))}
        </div>
    </div>
</div>
            {/* Stats Grid */}
            <div ref={statsRef} className="w-full py-16 h-[870px] flex items-center overflow-hidden bg-white scroll-animate" style={{ opacity: 0 }}>
                <div className="flex gap-8 animate-marquee">
                    {/* Grid Copy 1 */}
                    <div className="grid grid-cols-6 gap-4 h-[592px] min-w-[1200px] flex-shrink-0">
                        {[
                            { val: '2.9 Cr', label: 'Male', bg: 'bg-green-50', text: 'text-green-600' },
                            { val: '2.1 Cr', label: 'Experience', bg: 'bg-purple-50', text: 'text-purple-600' },
                            { val: '3 Cr', label: '0-4 years experienced', bg: 'bg-blue-50', text: 'text-blue-600', span: 'row-span-2' },
                            { val: '5 Cr+', label: 'Active job seekers', bg: 'bg-indigo-50', text: 'text-indigo-600', col: 'col-span-2' },
                            { val: '40 Lakh', label: 'Post Graduate', bg: 'bg-pink-50', text: 'text-pink-600' },
                            { val: '68 Lakh', label: 'BFSI', bg: 'bg-orange-50', text: 'text-orange-600' },
                            { val: '57 Lakh+', label: 'BPO Call center', bg: 'bg-teal-50', text: 'text-teal-600', col: 'col-span-2' },
                            { val: '2.3 Cr', label: 'Candidates in 11 cities', bg: 'bg-cyan-50', text: 'text-cyan-600', col: 'col-span-2 row-span-2' },
                            { val: '2.9 Cr', label: 'Male', bg: 'bg-green-50', text: 'text-green-600' },
                            { val: '2.1 Cr', label: 'Experience', bg: 'bg-purple-50', text: 'text-purple-600' },
                            { val: '3 Cr', label: '0-4 years experienced', bg: 'bg-blue-50', text: 'text-blue-600', span: 'row-span-2' },
                            { val: '5 Cr+', label: 'Active job seekers', bg: 'bg-indigo-50', text: 'text-indigo-600', col: 'col-span-2' },
                            { val: '40 Lakh', label: 'Post Graduate', bg: 'bg-pink-50', text: 'text-pink-600' },
                        ].map((stat, i) => (
                            <div key={i} className={`${stat.bg} ${stat.col || ''} ${stat.span || ''} rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:scale-105 transition-transform duration-300`}>
                                <h3 className={`text-2xl md:text-3xl font-bold ${stat.text} mb-1`}>{stat.val}</h3>
                                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Grid Copy 2 */}
                    <div className="grid grid-cols-6 gap-4 h-[592px] min-w-[1200px] flex-shrink-0">
                        {[
                            { val: '2.9 Cr', label: 'Male', bg: 'bg-green-50', text: 'text-green-600' },
                            { val: '2.1 Cr', label: 'Experience', bg: 'bg-purple-50', text: 'text-purple-600' },
                            { val: '3 Cr', label: '0-4 years experienced', bg: 'bg-blue-50', text: 'text-blue-600', span: 'row-span-2' },
                            { val: '5 Cr+', label: 'Active job seekers', bg: 'bg-indigo-50', text: 'text-indigo-600', col: 'col-span-2' },
                            { val: '40 Lakh', label: 'Post Graduate', bg: 'bg-pink-50', text: 'text-pink-600' },
                            { val: '68 Lakh', label: 'BFSI', bg: 'bg-orange-50', text: 'text-orange-600' },
                            { val: '57 Lakh+', label: 'BPO Call center', bg: 'bg-teal-50', text: 'text-teal-600', col: 'col-span-2' },
                            { val: '2.3 Cr', label: 'Candidates in 11 cities', bg: 'bg-cyan-50', text: 'text-cyan-600', col: 'col-span-2 row-span-2' },
                            { val: '2.9 Cr', label: 'Male', bg: 'bg-green-50', text: 'text-green-600' },
                            { val: '2.1 Cr', label: 'Experience', bg: 'bg-purple-50', text: 'text-purple-600' },
                            { val: '3 Cr', label: '0-4 years experienced', bg: 'bg-blue-50', text: 'text-blue-600', span: 'row-span-2' },
                            { val: '5 Cr+', label: 'Active job seekers', bg: 'bg-indigo-50', text: 'text-indigo-600', col: 'col-span-2' },
                            { val: '40 Lakh', label: 'Post Graduate', bg: 'bg-pink-50', text: 'text-pink-600' },
                        ].map((stat, i) => (
                            <div key={`dup-${i}`} className={`${stat.bg} ${stat.col || ''} ${stat.span || ''} rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:scale-105 transition-transform duration-300`}>
                                <h3 className={`text-2xl md:text-3xl font-bold ${stat.text} mb-1`}>{stat.val}</h3>
                                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section Reversed */}
            <div className="px-4 sm:px-6 lg:px-8 lg:px-[2.5rem] py-20 scroll-animate" style={{ opacity: 0 }}>
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="p-[48px] w-full md:w-[50%]">
                        <h4 className="text-gray-500 font-semibold tracking-widest uppercase mb-2 text-2xl">GET STARTED WITH JOB CHAAHIYE</h4>
                        <h2 className="text-4xl lg:text-6xl font-semibold text-gray-900 mb-4 leading-tight">
                            Post a job in minutes
                        </h2>
                        <p className="text-gray-600 text-2xl mb-8 leading-relaxed">
                            Revolutionize your hiring with our AI-powered algorithm.
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            {[
                                'Get unlimited applications',
                                '10x higher relevancy',
                                'Simplified job posting',
                                '40% better ROI than market'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Post a job now
                        </button>
                    </div>
                    <div className="w-full md:w-[50%] relative flex justify-center md:justify-start">
                        <img 
                            src="https://framerusercontent.com/images/1uIlwEEpRUpZTa12rq7s48QsQu0.png" 
                            alt="Job Chaahiye App" 
                            className="w-full max-w-md object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-4 sm:px-6 lg:px-8 lg:pl-[6rem] py-20 scroll-animate" style={{ opacity: 0 }}>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="p-[48px] w-full md:w-[60%]">
                        <h4 className="text-gray-500 font-semibold tracking-widest uppercase mb-2 text-2xl">HIRE FASTER, HIRE BETTER</h4>
                        <h2 className="text-4xl lg:text-6xl font-semibold text-gray-900 mb-4 leading-tight">
                            Introducing Job Chaahiye Database
                        </h2>
                        <p className="text-gray-600 text-2xl mb-8 leading-relaxed">
                            Find candidates based on location, skills and salary preferences from India's fastest growing talent pool.
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            {[
                                '5 Cr+ active job seekers',
                                'One click contact',
                                'Bulk download of profiles',
                                '40% better ROI than market'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Post a job now
                        </button>
                    </div>
                    <div className="w-full md:w-[40%] relative flex justify-center md:justify-start">
                        <img 
                            src="https://framerusercontent.com/images/1uIlwEEpRUpZTa12rq7s48QsQu0.png" 
                            alt="Job Chaahiye App" 
                            className="w-full max-w-md object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            

            {/* Testimonials */}
            <div className="py-20 bg-white scroll-animate" style={{ opacity: 0 }}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-2">What people are saying</h2>
                    <p className="text-[#696969] text-[15px] leading-[24px] font-normal">Consectetur adipiscing elit, sed do eiusmod temp</p>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div key={currentTestimonialPage} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-left">
                        {testimonials.slice(currentTestimonialPage * itemsPerPage, (currentTestimonialPage + 1) * itemsPerPage).map((t, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-50 flex flex-col items-start text-left h-full">
                                <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover mb-6" />
                                <h3 className="font-bold text-lg text-gray-900 mb-3">{t.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{t.text}</p>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2">
                        {[...Array(totalPages)].map((_, page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentTestimonialPage(page)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    currentTestimonialPage === page ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to page ${page + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Media & Mentions */}
            <div className="py-20 bg-white scroll-animate" style={{ opacity: 0 }}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">Media & Mentions</h2>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                img: "https://cdn.apna.co/employerDashboard_FE/jobs-success.jpeg",
                                text: "SMBs emerge as the leading job creators in India: Job chaahiye.co"
                            },
                            {
                                img: "https://cdn.apna.co/employerDashboard_FE/handshake.webp",
                                text: "Jobchaahiye.co, DGR partner to provide hyperlocal career opportunities for ex-servicemen"
                            },
                            {
                                img: "https://cdn.apna.co/employerDashboard_FE/empowerment.webp",
                                text: "Unlocking India's potential through women workforce"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 h-[500px]">
                                <div className="h-[300px] overflow-hidden">
                                    <img src={item.img} alt="Media coverage" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-6 flex-grow leading-snug">{item.text}</h3>
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium w-fit hover:bg-blue-600 transition-colors">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sales Enquiry Section */}
            <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center py-20 scroll-animate" style={{ opacity: 0 }}>
                <div className="w-full md:max-w-3xl mx-auto text-center">
                    <p className="text-gray-400 text-sm mb-2">Looking for enterprise solutions?</p>
                    <h2 className="text-4xl font-bold mb-12">Sales Enquiry</h2>

                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="w-full bg-[#1A2438] border-none rounded-lg h-[72px] px-[24px] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="text" placeholder="Last Name" className="w-full bg-[#1A2438] border-none rounded-lg h-[72px] px-[24px] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="email" placeholder="Email" className="w-full bg-[#1A2438] border-none rounded-lg h-[72px] px-[24px] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="tel" placeholder="Mobile Number" className="w-full bg-[#1A2438] border-none rounded-lg h-[72px] px-[24px] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Company" className="w-full bg-[#1A2438] border-none rounded-lg h-[72px] px-[24px] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <div className="relative">
                                <select className="w-full bg-[#1A2438] border-none rounded-lg h-[72px] px-[24px] text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer">
                                    <option value="">Number of Employees</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-50">11-50</option>
                                    <option value="51-200">51-200</option>
                                    <option value="200+">200+</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold h-[72px] px-[24px] rounded-lg transition-colors mt-[24px]">
                            Submit
                        </button>
                    </form>

                    <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm font-medium text-white">
                        <div className="flex flex-col items-center gap-2">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>5 Cr+ Candidates</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>700+ Cities</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>50 Lakh+ Jobs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 bg-[#f6f4ff] scroll-animate" style={{ opacity: 0 }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-blue-500 font-semibold text-2xl mb-6">FAQs</h3>
                        <h2 className="text-4xl md:text-6xl font-semibold text-gray-900">Frequently asked <br /> questions.</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`bg-[#f6f4ff] hover:bg-white rounded-lg overflow-hidden transition-all duration-300 ${openFaq === index ? 'shadow-md' : ''}`}
                            >
                                <button
                                    className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-bold text-gray-700 text-lg">{faq.question}</span>
                                    <span className="ml-4 text-2xl font-bold text-gray-400">
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                <div 
                                    className={`px-8 transition-all duration-300 ease-in-out overflow-hidden ${
                                        openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

     
            <footer className="bg-[#301f33] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 scroll-animate" style={{ opacity: 0 }}>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Links</h4>
                        <ul className="space-y-4 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-white">Site Map</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Center</a></li>
                            <li><a href="#" className="hover:text-white">Security Center</a></li>
                            <li><a href="#" className="hover:text-white">Accessibility Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Legal</h4>
                        <ul className="space-y-4 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">User Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white">Employer Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Employer FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Community Guidelines</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Resources</h4>
                        <ul className="space-y-4 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            <div className="bg-white border-t border-gray-100">
                <div className="px-4 sm:px-6 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-start gap-6">
                        <div className='flex items-center gap-2'>
                        <img src="https://employer.jobchaahiye.com/images/logo.png" alt="Job Chaahiye" className="h-[80px]" />
                        <div>
                            <p className="text-gray-600 font-medium mb-3">Follow us on social media</p>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"><Facebook size={16} /></div>
                                <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"><Twitter size={16} /></div>
                                <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"><Instagram size={16} /></div>
                                <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"><Linkedin size={16} /></div>
                                <div className="w-8 h-8 rounded-full bbg-blue-400 text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"><Youtube size={16} /></div>
                            </div>
                        </div>
                        </div>
                        <p className="text-gray-500 text-sm">© 2025 Job chaahiye All Right Reserved — Developed by Manya Shukla</p>
                    </div>
                    <div>
                        <img src="https://employer.jobchaahiye.com/images/footerbanner.png" alt="Footer Banner" className="h-48 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginEmployer;
