import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Twitter, Linkedin, Instagram, ChevronDown } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }, 1500);
    };

    const socialIcons = [
        { name: 'Facebook', icon: <Facebook size={20} className="text-emerald-100" /> },
        { name: 'Twitter', icon: <Twitter size={20} className="text-emerald-100" /> },
        { name: 'LinkedIn', icon: <Linkedin size={20} className="text-emerald-100" /> },
        { name: 'Instagram', icon: <Instagram size={20} className="text-emerald-100" /> }
    ];

    const faqs = [
        {
            question: "How do I register for a course?",
            answer: "You can register for our courses through our website by visiting the Courses page, selecting your preferred course, and following the registration process. Alternatively, you can contact our admissions team for assistance."
        },
        {
            question: "Are there any prerequisites for your courses?",
            answer: "Prerequisites vary by course. Some introductory courses have no prerequisites, while advanced courses may require prior knowledge or experience. Please check the specific course details or contact us for more information."
        },
        {
            question: "Do you offer online or in-person classes?",
            answer: "We offer both online and in-person training options for most of our courses. Our flexible learning approach allows students to choose the format that best suits their needs and schedules."
        },
        {
            question: "Are your courses internationally recognized?",
            answer: "Yes, our certification courses are designed to meet international standards and are recognized by relevant industry bodies. Our energy auditing qualifications are valued by employers worldwide."
        }
    ];

    // Scroll animation for elements
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            observer.observe(el);
        });

        return () => {
            elements.forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-white-800 to-white-600 py-32 overflow-hidden">
                <div className="absolute inset-0">
                    {/* Animated background elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-white"
                                style={{
                                    width: Math.random() * 18 + 'px',
                                    height: Math.random() * 18 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                    opacity: Math.random() * 0.5 + 0.3,
                                    animationDuration: `${Math.random() * 30 + 20}s`,
                                    animationDelay: `${Math.random() * 5}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Enhanced decorative elements */}
                    <div className="absolute -top-64 -right-64 w-96 h-96 bg-emerald-500/20 rounded-full backdrop-blur-sm"></div>
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full backdrop-blur-sm"></div>
                    <div className="absolute top-32 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full backdrop-blur-sm"></div>
                    <div className="absolute bottom-64 left-1/3 w-24 h-24 bg-emerald-500/10 rounded-full backdrop-blur-sm"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 tracking-tight">Get In Touch</h1>
                    <div className="w-24 h-1 bg-white mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-800 text-xl max-w-2xl mx-auto leading-relaxed">
                        Have questions about our courses or services? We're here to help you on your journey to becoming an energy efficiency expert.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-on-scroll">
                    <div className="grid md:grid-cols-2">
                        {/* Contact Form */}
                        <div className="p-8 lg:p-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                                <Send size={22} className="text-emerald-600 mr-3" />
                                <span>Send Us a Message</span>
                            </h2>

                            {isSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-center shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-102">
                                    <CheckCircle size={28} className="text-emerald-600 mr-4" />
                                    <div>
                                        <h3 className="font-medium text-emerald-800 text-lg">Thank you for your message!</h3>
                                        <p className="text-emerald-600">We'll get back to you as soon as possible.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md"
                                                placeholder="Course Inquiry"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="5"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md resize-none"
                                                placeholder="How can we help you?"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full px-6 py-4 bg-emerald-600 text-white rounded-lg font-medium text-lg hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <Send size={18} className="ml-2" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-8 lg:p-12 relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                            </div>

                            <div className="relative">
                                <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                                        <div className="bg-emerald-600/40 p-3 rounded-lg mr-4 shadow-lg">
                                            <MapPin size={24} className="text-emerald-100" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-emerald-100 text-lg">Our Location</h3>
                                            <p className="text-emerald-50 mt-1">123 Energy Street, Green Building</p>
                                            <p className="text-emerald-50">New Delhi, 110001, India</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                                        <div className="bg-emerald-600/40 p-3 rounded-lg mr-4 shadow-lg">
                                            <Phone size={24} className="text-emerald-100" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-emerald-100 text-lg">Phone Number</h3>
                                            <p className="text-emerald-50 mt-1">+91 98765 43210</p>
                                            <p className="text-emerald-50">+91 11 2345 6789</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                                        <div className="bg-emerald-600/40 p-3 rounded-lg mr-4 shadow-lg">
                                            <Mail size={24} className="text-emerald-100" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-emerald-100 text-lg">Email Address</h3>
                                            <p className="text-emerald-50 mt-1">info@eascindia.com</p>
                                            <p className="text-emerald-50">support@eascindia.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                                        <div className="bg-emerald-600/40 p-3 rounded-lg mr-4 shadow-lg">
                                            <Clock size={24} className="text-emerald-100" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-emerald-100 text-lg">Working Hours</h3>
                                            <p className="text-emerald-50 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p className="text-emerald-50">Saturday: 9:00 AM - 1:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-12 relative">
                                    <h3 className="font-medium text-emerald-100 text-lg mb-4">Connect With Us</h3>
                                    <div className="flex space-x-4">
                                        {socialIcons.map((social) => (
                                            <a
                                                key={social.name}
                                                href={`#${social.name.toLowerCase()}`}
                                                className="bg-emerald-600/40 hover:bg-emerald-500/60 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110"
                                                aria-label={`Visit our ${social.name} page`}
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Map with styled container */}
                <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden animate-on-scroll">
                    <div className="p-2">
                        <div className="aspect-w-16 aspect-h-9 w-full h-96 rounded-2xl overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2536666342856!2d77.22676525012483!3d28.56135208244353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26f903969d7%3A0x8f89b5e7f76a2d51!2sIndia%20Habitat%20Centre!5e0!3m2!1sen!2sin!4v1649858788446!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="EASC Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* FAQs Section */}
                <section className="mt-20 mb-10 animate-on-scroll">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Find answers to common questions about our courses and services
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className="bg-white mb-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <button
                                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                                    <ChevronDown 
                                        size={20} 
                                        className={`text-emerald-600 transition-transform duration-300 ${activeFaq === index ? 'transform rotate-180' : ''}`} 
                                    />
                                </button>
                                <div 
                                    className={`px-6 overflow-hidden transition-all duration-300 ${
                                        activeFaq === index ? 'max-h-40 pb-5' : 'max-h-0'
                                    }`}
                                >
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="my-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl overflow-hidden shadow-2xl animate-on-scroll">
                    <div className="relative p-12 md:p-16 text-center">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full"></div>
                        </div>
                        
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Energy Auditing Career?</h2>
                            <p className="text-emerald-100 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                                Join our community of energy professionals and make a difference in creating a more sustainable future.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a
                                    href="/courses"
                                    className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-medium text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Browse Courses
                                </a>
                                <a
                                    href="/about"
                                    className="px-8 py-4 bg-emerald-700 text-white border border-emerald-500 rounded-xl font-medium text-lg hover:bg-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                
                .animate-fade-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

export default ContactUs;