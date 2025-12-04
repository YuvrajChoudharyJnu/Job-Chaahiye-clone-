import { Bookmark, Briefcase, ChevronDown, Code, Facebook, Headphones, Instagram, Linkedin, MapPin, Quote, Rocket, Search, Twitter, User, UserCheck, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TestimonialCard = ({ testimonial, isActive }) => {
    return (
        <div
            className={`w-full bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 md:p-8 relative transition-all duration-700 flex-shrink-0 ${isActive ? 'shadow-2xl border-b-4 border-blue-600 md:scale-105 z-10 opacity-100' : 'shadow-sm border border-gray-100 hover:shadow-md md:scale-90 opacity-50 md:blur-[1px]'}`}
        >
            <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-100 fill-gray-100" />

            <div className="relative z-10">
                <h3 className="text-blue-500 font-semibold text-base sm:text-lg mb-4 sm:mb-6">{testimonial.title}</h3>
                <p className="text-gray-500 text-sm sm:text-sm leading-relaxed mb-6 sm:mb-8">
                    {testimonial.text}
                </p>

                <div className="flex items-center gap-3 sm:gap-4">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover bg-gray-200 rounded-full flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-dark text-sm sm:text-base md:text-lg truncate">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm truncate">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TestimonialCarousel = () => {
    const testimonials = [
        {
            id: 1,
            title: "Amazing Service",
            text: "More than just a job portal - it's a community. The forum where you can connect with other job seekers and advice. It's been really helpful for me.",
            name: "Shivam Malhotra",
            role: "Marketing Intern",
            image: "https://placehold.co/70x70/cccccc/ffffff?text=SM"
        },
        {
            id: 2,
            title: "Secure and Updated",
            text: "I was hesitant to use online job portals at first, but Job Chaahiye changed my mind. They have a very secure platform, and I feel confident about my data being protected. Plus, the job listings are always up-to-date.",
            name: "Sunita Devi",
            role: "Teacher",
            image: "https://placehold.co/410x500/b0b0b0/ffffff?text=SD"
        },
        {
            id: 3,
            title: "Life Saver",
            text: "Job Chaahiye was a lifesaver when I was looking. The platform is so easy to use and I found tons of opportunities in my field. I landed my dream job thanks to them!",
            name: "Priya Sharma",
            role: "Marketing Specialist",
            image: "https://placehold.co/70x70/e0e0e0/ffffff?text=PS"
        },
        {
            id: 4,
            title: "Great Opportunities",
            text: "I found my current job within a week of signing up. The filters are amazing and helped me narrow down exactly what I was looking for.",
            name: "Rahul Verma",
            role: "Software Engineer",
            image: "https://placehold.co/70x70/999999/ffffff?text=RV"
        },
        {
            id: 5,
            title: "User Friendly",
            text: "The interface is so clean and easy to navigate. I love the dashboard features for tracking my applications.",
            name: "Anita Desai",
            role: "HR Manager",
            image: "https://placehold.co/70x70/bbbbbb/ffffff?text=AD"
        },
        {
            id: 6,
            title: "Highly Recommended",
            text: "Best job portal I've used in India. The verified recruiters give me peace of mind.",
            name: "Vikram Singh",
            role: "Sales Executive",
            image: "https://placehold.co/70x70/dddddd/ffffff?text=VS"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [cardsPerView, setCardsPerView] = useState(3);

    // Update cards per view based on screen size
    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) {
                setCardsPerView(1); // Mobile: 1 card
            } else if (window.innerWidth < 1024) {
                setCardsPerView(2); // Tablet: 2 cards
            } else {
                setCardsPerView(3); // Desktop: 3 cards
            }
        };

        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    // Clone first items to append to end for infinite scroll effect
    const extendedTestimonials = [...testimonials, ...testimonials.slice(0, cardsPerView)];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => prev + 1);
        }, 5001); // Slower scroll (5s)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex === testimonials.length) {
            // Reset to 0 without transition after animation completes
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700); // Match transition duration
        } else if (currentIndex === 0) {
            // Re-enable transition if it was disabled
            setIsTransitioning(true);
        }
    }, [currentIndex, testimonials.length]);

    // Ensure transition is re-enabled after the snap-back
    useEffect(() => {
        if (!isTransitioning) {
            // Force reflow/next tick to re-enable transition
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    return (
        <div className="w-full mb-12">
            <div className="overflow-hidden w-full py-6 sm:py-8 md:py-10 px-4 sm:px-0"> {/* Responsive padding for shadow/scale space */}
                <div
                    className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                >
                    {extendedTestimonials.map((testimonial, index) => (
                        <div key={index} className={`${cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-1/2' : 'w-1/3'} flex-shrink-0 ${cardsPerView === 1 ? 'px-0' : 'px-1 sm:px-2 md:px-4'}`}>
                            <TestimonialCard
                                testimonial={testimonial}
                                isActive={index === Math.floor(currentIndex + cardsPerView / 2)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12 px-4">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setIsTransitioning(true);
                            setCurrentIndex(i);
                        }}
                        className={`h-2 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${(currentIndex % testimonials.length) === i ? 'w-8 sm:w-10 bg-blue-600' : 'w-2 sm:w-3 bg-blue-200'
                            }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('Trending');

    useEffect(() => {
        const dummyJobs = [
            // Trending (6 jobs)
            { _id: '1', title: 'Software Engineer', employer: { company: { name: 'Segment' } }, location: 'London, UK', type: 'Freelancer', tags: ['Urgent'], logoColor: 'bg-gray-800', category: 'Trending' },
            { _id: '2', title: 'Recruiting Coordinator', employer: { company: { name: 'Catalyst' } }, location: 'London, UK', type: 'Full Time', tags: ['Urgent'], logoColor: 'bg-blue-600', category: 'Trending' },
            { _id: '3', title: 'Product Manager, Studio', employer: { company: { name: 'Invision' } }, location: 'London, UK', type: 'Part Time', tags: ['Urgent'], logoColor: 'bg-red-500', category: 'Trending' },
            { _id: '4', title: 'Senior Product Designer', employer: { company: { name: 'Upwork' } }, location: 'London, UK', type: 'Temporary', tags: ['Urgent'], logoColor: 'bg-green-500', category: 'Trending' },
            { _id: '5', title: 'Product Manager, Risk', employer: { company: { name: 'Medium' } }, location: 'London, UK', type: 'Freelancer', tags: ['Private'], logoColor: 'bg-black', category: 'Trending' },
            { _id: '6', title: 'Technical Architect', employer: { company: { name: 'Lively' } }, location: 'London, UK', type: 'Full Time', tags: ['Private'], logoColor: 'bg-pink-600', category: 'Trending' },

            // Design (6 jobs - reusing some trending ones if they fit, plus new ones)
            { _id: '7', title: 'Senior Product Designer', employer: { company: { name: 'Upwork' } }, location: 'London, UK', type: 'Temporary', tags: ['Urgent'], logoColor: 'bg-green-500', category: 'Design' }, // Duplicate visual
            { _id: '8', title: 'UI/UX Designer', employer: { company: { name: 'Figma' } }, location: 'Remote', type: 'Full Time', tags: ['Urgent'], logoColor: 'bg-purple-500', category: 'Design' },
            { _id: '9', title: 'Graphic Designer', employer: { company: { name: 'Canva' } }, location: 'Sydney, AU', type: 'Part Time', tags: ['Private'], logoColor: 'bg-blue-400', category: 'Design' },
            { _id: '10', title: 'Product Designer', employer: { company: { name: 'Airbnb' } }, location: 'San Francisco, USA', type: 'Full Time', tags: ['Urgent'], logoColor: 'bg-red-400', category: 'Design' },
            { _id: '11', title: 'Web Designer', employer: { company: { name: 'Webflow' } }, location: 'Remote', type: 'Freelancer', tags: ['Urgent'], logoColor: 'bg-blue-500', category: 'Design' },
            { _id: '12', title: 'Brand Designer', employer: { company: { name: 'Nike' } }, location: 'Portland, USA', type: 'Contract', tags: ['Private'], logoColor: 'bg-black', category: 'Design' },

            // Marketing (3 jobs)
            { _id: '13', title: 'Marketing Lead', employer: { company: { name: 'Spotify' } }, location: 'Remote', type: 'Full Time', tags: ['Urgent'], logoColor: 'bg-green-600', category: 'Marketing' },
            { _id: '14', title: 'Social Media Manager', employer: { company: { name: 'TikTok' } }, location: 'London, UK', type: 'Part Time', tags: ['Urgent'], logoColor: 'bg-black', category: 'Marketing' },
            { _id: '15', title: 'Content Strategist', employer: { company: { name: 'HubSpot' } }, location: 'Boston, USA', type: 'Full Time', tags: ['Private'], logoColor: 'bg-orange-500', category: 'Marketing' },

            // Health (9 jobs)
            { _id: '16', title: 'Head of Health', employer: { company: { name: 'HealthPlus' } }, location: 'New York, USA', type: 'Contract', tags: ['Urgent'], logoColor: 'bg-red-600', category: 'Health' },
            { _id: '19', title: 'Nurse Practitioner', employer: { company: { name: 'HealthCare Inc' } }, location: 'London, UK', type: 'Full Time', tags: ['Urgent'], logoColor: 'bg-blue-400', category: 'Health' },
            { _id: '20', title: 'Medical Researcher', employer: { company: { name: 'BioLabs' } }, location: 'Cambridge, UK', type: 'Full Time', tags: ['Private'], logoColor: 'bg-green-600', category: 'Health' },
            { _id: '21', title: 'Dental Assistant', employer: { company: { name: 'SmileCare' } }, location: 'Manchester, UK', type: 'Part Time', tags: ['Urgent'], logoColor: 'bg-yellow-500', category: 'Health' },
            { _id: '22', title: 'Physical Therapist', employer: { company: { name: 'PhysioWorld' } }, location: 'London, UK', type: 'Freelancer', tags: ['Private'], logoColor: 'bg-purple-600', category: 'Health' },
            { _id: '23', title: 'Pharmacist', employer: { company: { name: 'PharmaPlus' } }, location: 'Leeds, UK', type: 'Full Time', tags: ['Urgent'], logoColor: 'bg-teal-500', category: 'Health' },
            { _id: '24', title: 'Surgeon', employer: { company: { name: 'City Hospital' } }, location: 'London, UK', type: 'Full Time', tags: ['Private'], logoColor: 'bg-red-500', category: 'Health' },
            { _id: '25', title: 'Lab Technician', employer: { company: { name: 'QuickLab' } }, location: 'Bristol, UK', type: 'Part Time', tags: ['Urgent'], logoColor: 'bg-indigo-500', category: 'Health' },
            { _id: '26', title: 'Radiologist', employer: { company: { name: 'ScanCenter' } }, location: 'London, UK', type: 'Contract', tags: ['Private'], logoColor: 'bg-gray-700', category: 'Health' },
            
            // Extra jobs to make 'All' count to 9 (using a mix)
             { _id: '17', title: 'Web Developer', employer: { company: { name: 'Udemy' } }, location: 'London, UK', type: 'Part Time', tags: ['Urgent'], logoColor: 'bg-orange-500', category: 'All' },
             { _id: '18', title: 'Senior BI Analyst', employer: { company: { name: 'Figma' } }, location: 'London, UK', type: 'Freelancer', tags: ['Private'], logoColor: 'bg-purple-500', category: 'All' }

        ];
        setJobs(dummyJobs);
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

    const [typingText, setTypingText] = useState('Data Analytics');

    useEffect(() => {
        const words = ['Data Analytics', 'Product Management', 'Web Development', 'Digital Marketing'];
        let i = 0;
        let j = 0;
        let currentWord = '';
        let isDeleting = false;

        const type = () => {
            currentWord = words[i];
            if (isDeleting) {
                setTypingText(currentWord.substring(0, j - 1));
                j--;
                if (j === 0) {
                    isDeleting = false;
                    i++;
                    if (i === words.length) i = 0;
                }
            } else {
                setTypingText(currentWord.substring(0, j + 1));
                j++;
                if (j === currentWord.length) {
                    isDeleting = true;
                }
            }
            setTimeout(type, isDeleting ? 100 : 200);
        };
        const timer = setTimeout(type, 200);
        return () => clearTimeout(timer);
    }, []);

    const filteredJobs = Array.isArray(jobs) ? jobs.filter(job => {
        if (activeTab === 'All') {
            // For 'All', we want specific 9 jobs (ids 1-6 + 17, 18 + one more to make 9 if needed, or just slice 9 from a specific list)
            // To be simple, let's just return the first 9 jobs from the list that are meant for 'All' view or just slice later.
            // Actually, let's filter by a property or just return specific IDs for exact match.
            return ['1', '2', '3', '4', '5', '6', '17', '18', '7'].includes(job._id);
        }
        if (activeTab === 'Trending') return job.category === 'Trending';
        if (activeTab === 'Design') return job.category === 'Design';
        if (activeTab === 'Marketing') return job.category === 'Marketing';
        if (activeTab === 'Health') return job.category === 'Health';
        return false;
    }) : [];

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-white via-[rgba(162,190,244,0.365)] to-[rgba(115,165,243,0.376)]">
                <div className="px-4 sm:px-6 lg:px-16 relative z-10 h-full py-16 md:py-32">
                    <div className="w-full lg:max-w-[65%] text-left mb-12 md:mb-0 relative z-20 animate-slide-up">
                        <h3 className="font-medium text-dark mb-3 leading-tight">
                            Meticulously Handpicked <span className="text-primary border-b-2 border-primary">{typingText}<span className="animate-pulse">|</span></span> Jobs
                        </h3>
                        <h3 className="font-bold text-primary mb-6">India's #1 Job Platform</h3>

                        <h1 className="text-[40px] md:text-[50px] font-extrabold text-dark mb-8 tracking-tight leading-none">
                            Your Job Search Ends <span className="text-primary">Here!</span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 font-medium">Find Jobs, Employment & Career Opportunities</p>

                        <div className="relative bg-white rounded-[10px] border border-[#ecedf2] flex flex-col md:flex-row items-center w-full mb-[22px] p-5 md:pl-[30px] md:pr-5 md:py-5" style={{ boxShadow: 'rgba(64, 79, 104, 0.05) 0px 7px 18px' }}>
                            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 w-full">
                                <Search className="text-gray-400 w-5 h-5 mr-3" />
                                <input type="text" placeholder="Job title, keywords, or company" className="w-full outline-none text-dark placeholder-gray-400 bg-transparent text-sm font-medium" />
                            </div>
                            <div className="flex-1 flex items-center px-4 py-3 w-full">
                                <MapPin className="text-gray-400 w-5 h-5 mr-3" />
                                <input type="text" placeholder="City or postcode" className="w-full outline-none text-dark placeholder-gray-400 bg-transparent text-sm font-medium" />
                            </div>
                            <button className="relative bg-primary text-white text-center whitespace-nowrap text-[15px] leading-[20px] rounded-[8px] font-normal h-[60px] w-full md:w-[290px] hover:bg-blue-700 transition-colors cursor-pointer" style={{ padding: '18px 35px 15px' }}>
                                Find Jobs
                            </button>
                        </div>


                    </div>

                    <div className="hidden lg:block absolute right-0 top-0 w-[35%] h-[650px] animate-slide-left" style={{ animationDelay: '0.2s', opacity: 0 }}>
                        {/* Hero Image */}
                        <div className="relative h-full flex items-center justify-end pr-8">
                            <img src="/assets/hero-image.png" alt="Job Search" className="h-full max-h-[690px] w-auto object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>

                    {/* Recent Interview Ticker - Full Width */}
                    <div className="absolute bottom-4 left-0 right-0 w-full overflow-hidden z-30 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
                        <div className="flex space-x-6 animate-marquee whitespace-nowrap">
                            {[
                                { name: 'Devendra Singh', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/11.jpg' },
                                { name: 'Jatin Bhardwaj', text: 'got job 5 hours ago', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
                                { name: 'Saloni Kondhalkar', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
                                { name: 'Suraj Pal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
                                { name: 'Mohit', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
                                { name: 'Manoj Gupta', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/55.jpg' },
                                { name: 'Dipti Mandal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/28.jpg' },
                                { name: 'Priya Sharma', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/22.jpg' }
                            ].map((person, index) => (
                                <div key={index} className="bg-white rounded-full px-4 py-2 shadow-md border border-gray-100 inline-flex items-center flex-shrink-0 w-[260px] h-[76px]">
                                    <img src={person.img} alt="User" className="w-10 h-10 rounded-full mr-3 border-2 border-green-100 object-cover" />
                                    <div className="flex flex-col justify-center overflow-hidden">
                                        <span className="text-sm text-gray-800 font-bold truncate w-full">{person.name}</span>
                                        <span className="text-xs text-gray-500 font-medium truncate w-full">{person.text}</span>
                                    </div>
                                </div>
                            ))}
                            {[
                                { name: 'Devendra Singh', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/11.jpg' },
                                { name: 'Jatin Bhardwaj', text: 'got job 5 hours ago', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
                                { name: 'Saloni Kondhalkar', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
                                { name: 'Suraj Pal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
                                { name: 'Mohit', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
                                { name: 'Manoj Gupta', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/55.jpg' },
                                { name: 'Dipti Mandal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/28.jpg' },
                                { name: 'Priya Sharma', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/22.jpg' }
                            ].map((person, index) => (
                                <div key={`dup-${index}`} className="bg-white rounded-full px-4 py-2 shadow-md border border-gray-100 inline-flex items-center flex-shrink-0 w-[260px] h-[76px]">
                                    <img src={person.img} alt="User" className="w-10 h-10 rounded-full mr-3 border-2 border-green-100 object-cover" />
                                    <div className="flex flex-col justify-center overflow-hidden">
                                        <span className="text-sm text-gray-800 font-bold truncate w-full">{person.name}</span>
                                        <span className="text-xs text-gray-500 font-medium truncate w-full">{person.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

{/* Popular Searches - Responsive with Mobile Touch Support */}
<div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Title Box - Responsive */}
        <div className="flex items-center justify-center md:justify-start p-4 sm:p-5 md:p-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight">
                Popular<br />Searches on <br /><span className="text-primary">Job Chaahiye</span>
            </h2>
        </div>

        {[
            { title: 'Jobs for Freshers', img: '/assets/freshers.png', id: 1, color: 'orange' },
            { title: 'Work from home Jobs', img: '/assets/wfh.png', id: 2, color: 'purple' },
            { title: 'Part time Jobs', img: '/assets/part-time.png', id: 3, color: 'red' },
            { title: 'Jobs for Women', img: '/assets/women.png', id: 4, color: 'emerald' },
            { title: 'International Jobs', img: '/assets/international.png', id: 5, color: 'blue' }
        ].map((item, index) => {
            const colorClasses = {
                orange: { 
                    hoverBorder: 'hover:border-orange-500 active:border-orange-500', 
                    hoverBg: 'hover:bg-orange-50 active:bg-orange-50', 
                    button: 'group-hover:bg-orange-600 group-hover:text-white group-active:bg-orange-600 group-active:text-white', 
                    title: 'group-hover:text-orange-600 group-active:text-orange-600',
                    text: 'text-orange-900'
                },
                purple: { 
                    hoverBorder: 'hover:border-purple-500 active:border-purple-500', 
                    hoverBg: 'hover:bg-purple-50 active:bg-purple-50', 
                    button: 'group-hover:bg-purple-600 group-hover:text-white group-active:bg-purple-600 group-active:text-white', 
                    title: 'group-hover:text-purple-600 group-active:text-purple-600',
                    text: 'text-purple-900'
                },
                red: { 
                    hoverBorder: 'hover:border-red-500 active:border-red-500', 
                    hoverBg: 'hover:bg-red-50 active:bg-red-50', 
                    button: 'group-hover:bg-red-600 group-hover:text-white group-active:bg-red-600 group-active:text-white', 
                    title: 'group-hover:text-red-600 group-active:text-red-600',
                    text: 'text-red-900'
                },
                emerald: { 
                    hoverBorder: 'hover:border-emerald-500 active:border-emerald-500', 
                    hoverBg: 'hover:bg-emerald-50 active:bg-emerald-50', 
                    button: 'group-hover:bg-emerald-600 group-hover:text-white group-active:bg-emerald-600 group-active:text-white', 
                    title: 'group-hover:text-emerald-600 group-active:text-emerald-600',
                    text: 'text-emerald-900'
                },
                blue: { 
                    hoverBorder: 'hover:border-blue-500 active:border-blue-500', 
                    hoverBg: 'hover:bg-blue-50 active:bg-blue-50', 
                    button: 'group-hover:bg-blue-600 group-hover:text-white group-active:bg-blue-600 group-active:text-white', 
                    title: 'group-hover:text-blue-600 group-active:text-blue-600',
                    text: 'text-blue-900'
                }
            };
            const colors = colorClasses[item.color];

            return (
                <div 
    key={index} 
    className={`group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 
                p-4 sm:p-5 md:p-6 relative overflow-hidden transition-all duration-300 
                h-56 sm:h-60 md:h-64 lg:h-72 flex flex-col justify-between 
                ${colors.hoverBorder} ${colors.hoverBg} 
                hover:shadow-xl active:shadow-lg
                active:scale-[0.98] touch-manipulation select-none
                cursor-pointer`}
    onTouchStart={(e) => {
        e.currentTarget.classList.add('active');
    }}
    onTouchEnd={(e) => {
        e.currentTarget.classList.remove('active');
    }}
>
    <div className="relative z-10">
        <span className="text-[9px] xs:text-[10px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">
            TRENDING AT #{item.id}
        </span>
        <h3 className={`text-base sm:text-lg md:text-xl font-semibold text-gray-800 mt-1 sm:mt-2 relative z-10 transition-colors ${colors.title}`}>
            {item.title}
        </h3>
    </div>

    {/* Watermark Text - Centered, 3xl, Complete Text */}
    <div className={`absolute inset-0 flex items-center justify-center
                     text-xl sm:text-4xl md:text-5xl
                     font-black uppercase leading-none select-none pointer-events-none 
                     opacity-5 group-hover:opacity-10 group-active:opacity-10 
                     transition-opacity duration-300 ${colors.text} text-center px-2`}>
        {item.title}
    </div>

    <div className="flex justify-between items-end mt-auto relative z-20">
        <button className={`text-xs sm:text-sm font-bold text-blue-600 
                         px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                         transition-all duration-300 border border-blue-600 
                         hover:border-transparent active:border-transparent
                         ${colors.button}`}>
            View all
        </button>
        
        {/* Responsive Image */}
        <img 
            src={item.img} 
            alt={item.title}
            className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 
                     object-contain transition-transform duration-500 
                     group-hover:scale-110 group-active:scale-110
                     -mb-6 -mr-4 sm:-mb-7 sm:-mr-5 md:-mb-8 md:-mr-6 lg:-mb-8 lg:-mr-8"
            loading="lazy"
            width="144"
            height="144"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/placeholder-job.png';
            }}
        />
    </div>
</div>
            );
        })}
    </div>
</div>

            {/* Featured Jobs - Full Width */}
<div className="bg-[#E5EFFF] py-12 md:py-20 w-full relative scroll-animate" style={{ opacity: 0 }}>
    <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-2 sm:mb-4">Featured Jobs</h2>
            <p className="text-sm sm:text-base text-gray-500 px-2 sm:px-0">Know your worth and find the job that qualify your life</p>

            {/* Tab Navigation - Mobile Optimized */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-6 md:mt-8 flex-wrap px-2">
                {['All', 'Trending', 'Design', 'Marketing', 'Health'].map((tab) => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                            activeTab === tab 
                                ? 'bg-primary text-white shadow-md' 
                                : 'bg-[#e2eaf8] text-gray-600 hover:bg-white active:bg-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Jobs Grid - Full Width Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full">
            {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                    <Link 
                        to={`/jobs/${job._id}`} 
                        key={job._id || index} 
                        className="block bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-100 hover:shadow-lg active:shadow-md transition-all group w-full"
                    >
                        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 ${job.logoColor || 'bg-blue-600'}`}>
                                {job.employer?.company?.name?.charAt(0) || 'C'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-dark mb-1 line-clamp-1">{job.title}</h3>
                                <div className="flex flex-col xs:flex-row xs:items-center text-xs sm:text-sm text-gray-500 gap-1 xs:gap-2 sm:gap-3">
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                        <span className="truncate">{job.employer?.company?.name || 'Company'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                        <span className="truncate">{job.location || 'Remote'}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-primary active:text-primary flex-shrink-0">
                                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 whitespace-nowrap">
                                {job.type || 'Full Time'}
                            </span>
                            <span className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                                job.tags?.includes('Urgent') ? 'bg-yellow-50 text-yellow-600' : 
                                job.tags?.includes('Private') ? 'bg-green-50 text-green-600' : 
                                'bg-gray-50 text-gray-600'
                            }`}>
                                {job.tags?.[0] || job.salary || 'Negotiable'}
                            </span>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="col-span-1 xs:col-span-2 lg:col-span-3 text-center py-10 text-gray-500 text-sm sm:text-base">
                    No jobs found. Please check back later.
                </div>
            )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-2">
            <button className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-200 text-sm sm:text-base w-full sm:w-auto">
                Load More Listing
            </button>
        </div>
    </div>
</div>

           {/* Popular Job Categories */}
<div className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden scroll-animate" style={{ opacity: 0 }}>
    {/* Add inline CSS for animations */}
    <style>
        {`
            @keyframes marquee-slow {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }
            
            @keyframes marquee-reverse-slow {
                0% {
                    transform: translateX(-50%);
                }
                100% {
                    transform: translateX(0);
                }
            }
            
            .animate-marquee-slow {
                animation: marquee-slow 60s linear infinite;
            }
            
            .animate-marquee-reverse-slow {
                animation: marquee-reverse-slow 60s linear infinite;
            }
            
            .animate-marquee-slow:hover,
            .animate-marquee-reverse-slow:hover {
                animation-play-state: paused;
            }
            
            @media (max-width: 768px) {
                .animate-marquee-slow {
                    animation: marquee-slow 80s linear infinite;
                }
                
                .animate-marquee-reverse-slow {
                    animation: marquee-reverse-slow 80s linear infinite;
                }
            }
        `}
    </style>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-2 sm:mb-3 md:mb-4">Popular Job Categories</h2>
            <p className="text-sm sm:text-base text-gray-500">2020 jobs live - 293 added today.</p>
        </div>
    </div>

    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full mb-8 md:mb-10 lg:mb-12">

        {/* First Row - Right to Left - Slower Speed */}
        <div className="flex gap-4 sm:gap-5 md:gap-6 animate-marquee-slow w-max hover:[animation-play-state:paused]">
            {[
                { title: 'Development', positions: 12, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Human Resource', positions: 55, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Automotive Jobs', positions: 2, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Customer Service', positions: 2, icon: Headphones, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Health and Care', positions: 25, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Project Management', positions: 92, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Marketing', positions: 18, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                // Duplicate for seamless loop
                { title: 'Development', positions: 12, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Human Resource', positions: 55, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Automotive Jobs', positions: 2, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Customer Service', positions: 2, icon: Headphones, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Health and Care', positions: 25, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Project Management', positions: 92, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Marketing', positions: 18, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
            ].map((cat, index) => (
                <div key={index} className="w-[280px] sm:w-[300px] md:w-[320px] bg-white border border-blue-100 rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer group flex-shrink-0 hover:border-blue-300 hover:scale-[1.02] active:scale-100">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg ${cat.bg} flex items-center justify-center ${cat.color} group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex-shrink-0`}>
                        <cat.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark text-base sm:text-lg md:text-xl mb-1">{cat.title}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">({cat.positions} open positions)</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Second Row - Left to Right - Slower Speed */}
        <div className="flex gap-4 sm:gap-5 md:gap-6 animate-marquee-reverse-slow w-max hover:[animation-play-state:paused]">
            {[
                { title: 'Design', positions: 42, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Sales', positions: 15, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Finance', positions: 8, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Engineering', positions: 34, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Teaching', positions: 12, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Medical', positions: 45, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Construction', positions: 7, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                // Duplicate for seamless loop
                { title: 'Design', positions: 42, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Sales', positions: 15, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Finance', positions: 8, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Engineering', positions: 34, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Teaching', positions: 12, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Medical', positions: 45, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                { title: 'Construction', positions: 7, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
            ].map((cat, index) => (
                <div key={index} className="w-[280px] sm:w-[300px] md:w-[320px] bg-white border border-blue-100 rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer group flex-shrink-0 hover:border-blue-300 hover:scale-[1.02] active:scale-100">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg ${cat.bg} flex items-center justify-center ${cat.color} group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex-shrink-0`}>
                        <cat.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark text-base sm:text-lg md:text-xl mb-1">{cat.title}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">({cat.positions} open positions)</p>
                    </div>
                </div>
            ))}
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <button className="inline-flex items-center text-primary font-bold border border-blue-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors duration-300 text-sm sm:text-base">
                View All <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
            </button>
        </div>
    </div>
</div>

            {/* Testimonials Section */}
            <div className="py-12 sm:py-16 md:py-20 bg-[#f8faff] overflow-hidden scroll-animate" style={{ opacity: 0 }}>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4 px-2 sm:px-0">Testimonials From Our Customers</h2>
                        <p className="text-gray-500 text-sm sm:text-base px-4 sm:px-0">Don't trust us right away, see what our customers have to say!</p>
                    </div>
                </div>

                <TestimonialCarousel />
            </div>

          {/* Want To Hire Section - Proper Spacing & Positioning */}
<div className="py-12 sm:py-16 md:py-20 bg-white">
    <div className="w-[90%] max-w-7xl mx-auto">
        <div className="bg-[#e9f2ff] rounded-2xl sm:rounded-3xl overflow-hidden">
            
            {/* Mobile Layout: Content Above, Image Below */}
            <div className="md:hidden flex flex-col">
                {/* Content First on Mobile */}
                <div className="p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">
                        Want To Hire?
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
                    </p>
                    <div className="mt-4 sm:mt-6">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 text-sm sm:text-base min-h-[44px] w-full sm:w-auto">
                            Post a Job
                        </button>
                    </div>
                </div>
                
                {/* Image Below on Mobile - with spacing */}
                <div className="h-[250px] sm:h-[300px] relative mt-4">
                    <div className="absolute inset-0 flex items-end justify-center">
                        <img
                            src="/assets/hire-people.png"
                            alt="Professionals"
                            className="w-[80%] h-[90%] object-contain object-bottom"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Layout: Image Left, Content Right with spacing */}
            <div className="hidden md:flex md:flex-row items-center">
                {/* Image on LEFT side */}
                <div className="w-1/2 relative h-[400px] lg:h-[500px]">
                    <div className="absolute inset-0 flex items-end justify-center pr-8 lg:pr-12">
                        <img
                            src="/assets/hire-people.png"
                            alt="Professionals"
                            className="w-[85%] h-[90%] object-contain object-bottom"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Content on RIGHT side with spacing */}
                <div className="w-1/2 p-8 lg:p-12 text-left pl-4 lg:pl-8">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 mb-4 lg:mb-6">
                        Want To Hire?
                    </h2>
                    <p className="text-gray-600 text-lg lg:text-xl mb-6 lg:mb-8 max-w-lg leading-relaxed lg:leading-loose">
                        Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
                    </p>
                    <div className="mt-6 lg:mt-8">
                        <button className="bg-blue-600 text-white px-10 py-3.5 lg:py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-xl text-lg min-w-[180px]">
                            Post a Job
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

            {/* Footer Links Section */}
            <div className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Find Jobs */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Find Jobs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Agra</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Ahmedabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Ahmednagar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Ajmer</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Aligarh</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Amritsar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Asansol</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Aurangabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Bareilly</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Belagavi</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Bengaluru</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Bhavnagar</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Start Hiring */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Start Hiring</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Agra</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Ahmedabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Ahmednagar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Ajmer</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Aligarh</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Amritsar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Asansol</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Aurangabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Bareilly</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Belagavi</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Bengaluru</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Bhavnagar</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Popular Jobs */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Popular Jobs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Delivery Person Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Accounts / Finance Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Sales (Field Work)</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Human Resource</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Backoffice Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Business Development</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Telecaller / BPO</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Work from Home Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Part Time Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Full Time Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Night Shift Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Freshers Jobs</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Jobs by Department */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Jobs by Department</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Admin / Back Office / Computer Operator Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Advertising / Communication Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Aviation & Aerospace Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Banking / Insurance / Financial Services Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Beauty, Fitness & Personal Care Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Construction & Site Engineering Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Consulting Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Content, Editorial & Journalism Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">CSR & Social Service Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Customer Support Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Data Science & Analytics Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Delivery / Driver / Logistics Jobs</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Main Footer Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                        <div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-6">Links</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Download Job Chaahiye App</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Free Job Alerts</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Vulnerability Disclosure Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">International Jobs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-6">Legal</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">User Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Employer Terms of Service</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Employer FAQs</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Community Guidelines</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-6">Resources</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-[#1a1a2e] text-white pt-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

                    {/* Social Media */}
                    <div className="flex flex-col items-start gap-6">
                        <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-1">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                            <div className="flex flex-col">
                                <span className="text-blue-600 font-bold text-lg leading-none">Job</span>
                                <span className="text-orange-500 font-bold text-xs leading-none tracking-widest">Chaahiye</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Follow us on social media</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
                            </div>
                        </div>
                    </div>

                    {/* App Download */}
                    <div className="bg-white text-[#1a1a2e] p-6 rounded-2xl flex items-center gap-6 shadow-lg max-w-md w-full md:w-auto">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Apply on the go</h3>
                            <p className="text-gray-600 text-sm mb-4">Get real time job updates on our App</p>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Get it on Google Play"
                                className="h-10 cursor-pointer"
                            />
                        </div>
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://jobchaahiye.com"
                            alt="QR Code"
                            className="w-24 h-24"
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs mb-4">
                    <p>© 2025 Job Chaahiye | All rights reserved — Developed by Manya Shukla</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                    </div>
                </div>
                <div className="w-full h-2 flex">
                    <div className="w-1/3 bg-[#FF9933]"></div>
                    <div className="w-1/3 bg-white"></div>
                    <div className="w-1/3 bg-[#138808]"></div>
                </div>
            </div>
            < button className="fixed bottom-8 right-8 w-10 h-10 bg-blue-100 text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-50 shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ChevronDown className="w-5 h-5 rotate-180" />
            </button >
        </div >

    );
};

export default Home;
