import { useState, useEffect, useRef } from 'react';
import { Zap, Shield, BadgeCheck, Leaf, LineChart, PieChart, Lightbulb, ChevronRight } from 'lucide-react';
import energyAuditImg from "../../assets/energy-audits.jpg";
import electricalSafetyImg from "../../assets/Electrical-Safety.jpg";
import naacAuditImg from "../../assets/NAAC.jfif";
import carbonCreditImg from "../../assets/Carbon-Credit.webp";
import patConsultancyImg from "../../assets/PAT.jpg";
import powerAssessmentImg from "../../assets/Electrical-Power.jfif";
import electricalConsultancyImg from "../../assets/electrical-consultancy.jpg";
import "./Pages.css";

const Services = () => {
  const [visibleItems, setVisibleItems] = useState({});
  const observersRef = useRef([]);
  const servicesRef = useRef([]);

  // Services data with additional animation properties and detailed text for opposite side
  const services = [
    {
      id: 1,
      title: "Energy Audit",
      description: "Comprehensive energy consumption assessment to identify efficiency opportunities, reduce wastage, and optimize energy usage across residential, commercial, and industrial facilities.",
      oppositeText: {
        heading: "Benefits of Energy Audit",
        points: [
          "Reduce energy costs by 5-30%",
          "Identify inefficient equipment", 
          "Prioritize energy investments",
          "Meet compliance requirements"
        ]
      },
      icon: <PieChart size={40} className="text-emerald-600" />,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      image: energyAuditImg,
      animDelay: "100ms"
    },
    {
      id: 2,
      title: "Electrical Safety Audit",
      description: "Thorough examination of electrical systems to identify safety hazards, ensure compliance with regulations, and prevent potential electrical accidents and failures.",
      oppositeText: {
        heading: "Why Safety Matters",
        points: [
          "Prevent workplace accidents",
          "Regulatory compliance", 
          "Lower insurance premiums",
          "Protection from liability"
        ]
      },
      icon: <Shield size={40} className="text-blue-600" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: electricalSafetyImg,
      animDelay: "200ms"
    },
    {
      id: 3,
      title: "NAAC Audit",
      description: "Specialized assessment services for educational institutions preparing for National Assessment and Accreditation Council certification, focusing on energy efficiency and sustainability metrics.",
      oppositeText: {
        heading: "NAAC Accreditation Value",
        points: [
          "Enhanced institutional reputation",
          "Better student enrollment", 
          "Eligibility for grants",
          "Quality benchmark recognition"
        ]
      },
      icon: <BadgeCheck size={40} className="text-purple-600" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      image: naacAuditImg,
      animDelay: "300ms"
    },
    {
      id: 4,
      title: "Carbon Credit Assessment",
      description: "Expert evaluation and documentation of carbon emission reductions to help organizations monetize their sustainability efforts through carbon credit markets.",
      oppositeText: {
        heading: "Carbon Credit Advantages",
        points: [
          "Monetize sustainability efforts",
          "Enhance green credentials", 
          "Meet ESG objectives",
          "Attract socially conscious investors"
        ]
      },
      icon: <Leaf size={40} className="text-green-600" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      image: carbonCreditImg,
      animDelay: "400ms"
    },
    {
      id: 5,
      title: "PAT Consultancy",
      description: "Specialized consulting for industries under the Perform, Achieve and Trade scheme, helping them meet energy efficiency targets and trade energy saving certificates effectively.",
      oppositeText: {
        heading: "PAT Scheme Benefits",
        points: [
          "Compliance with national programs",
          "Trading of Energy Saving Certificates", 
          "Reduced operational costs",
          "Improved industry reputation"
        ]
      },
      icon: <LineChart size={40} className="text-amber-600" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      image: patConsultancyImg,
      animDelay: "500ms"
    },
    {
      id: 6,
      title: "Electrical Power Assessment",
      description: "Detailed analysis of electrical power systems, load profiles, and distribution networks to optimize performance, reduce losses, and improve reliability.",
      oppositeText: {
        heading: "Power System Optimization",
        points: [
          "Improved power quality",
          "Reduced distribution losses", 
          "Enhanced system reliability",
          "Lower maintenance costs"
        ]
      },
      icon: <Zap size={40} className="text-rose-600" />,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      image: powerAssessmentImg,
      animDelay: "600ms"
    },
    {
      id: 7,
      title: "Electrical Consultancy",
      description: "Expert guidance on electrical system design, upgrades, and regulatory compliance to ensure safety, efficiency, and sustainability across all electrical infrastructure.",
      oppositeText: {
        // heading: "Consultancy Expertise",
        heading: "Lorem ipsum dolor sit amet",
        points: [
          "Lorem ipsum dolor sit amet",
          "Lorem ipsum dolor sit amet",
          "Lorem ipsum dolor sit amet",
          "Lorem ipsum dolor sit amet",

          // "Custom system design",
          // "Regulatory compliance guidance", 
          // "Cost-effective solutions",
          // "Future-proofed infrastructure"
        ]
      },
      icon: <Lightbulb size={40} className="text-indigo-600" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      image: electricalConsultancyImg,
      animDelay: "700ms"
    }
  ];

  // Set up Intersection Observer to handle animations when elements come into view
  useEffect(() => {
    servicesRef.current = document.querySelectorAll('.service-item');
    
    // Initialize intersection observer for service cards
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          setVisibleItems(prev => ({ ...prev, [id]: true }));
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    servicesRef.current.forEach(item => {
      observer.observe(item);
    });
    
    observersRef.current.push(observer);
    
    return () => {
      observersRef.current.forEach(obs => obs.disconnect());
    };
  }, []);

  // Animation for header elements
  const [headerVisible, setHeaderVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-300 to-blue-300 blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-300 to-green-300 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header section with animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h1 
            className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 mb-6 transform transition-all duration-1000 ${
              headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Our Services
          </h1>
          <div 
            className={`w-32 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-8 rounded-full transform transition-all duration-1000 delay-300 ${
              headerVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          ></div>
          <p 
            className={`max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed transform transition-all duration-1000 delay-500 ${
              headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Expert energy audit and electrical consultancy solutions to optimize 
            performance, ensure safety, and achieve sustainability goals.
          </p>
        </div>

        {/* Timeline section with enhanced animations */}
        <div className="relative">
          {/* Animated Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-600 animate-pulse"></div>
          </div>

          {/* Services timeline with alternating left/right layout */}
          <div className="relative">
            {services.map((service, index) => {
              // Determine if service should be on left or right
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  data-id={service.id}
                  className="flex items-center mb-24 service-item relative"
                  style={{
                    marginBottom: index === services.length - 1 ? '0' : '6rem'
                  }}
                >
                  {/* Animated Timeline dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 border-4 border-white shadow-lg z-10 
                    transition-all duration-700 ${visibleItems[service.id] ? 'scale-100' : 'scale-0'}`}>
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-75"></span>
                  </div>
                  
                  {/* Left side content */}
                  <div className={`w-1/2 pr-12 ${isEven ? 'block' : 'hidden md:block'}`}>
                    {isEven ? (
                      <div 
                        className={`ml-auto mr-0 w-full md:max-w-lg rounded-xl shadow-xl 
                          transform transition-all duration-1000
                          ${visibleItems[service.id] ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}
                          ${service.borderColor} overflow-hidden group`}
                        style={{ 
                          transitionDelay: visibleItems[service.id] ? service.animDelay : '0ms',
                          background: `linear-gradient(to bottom right, ${service.bgColor.replace('bg-', 'var(--')}, white)`
                        }}
                      >
                        {/* Card Content for left side */}
                        <ServiceCard service={service} />
                      </div>
                    ) : (
                      /* Text content for odd items on the left side */
                      <div className={`text-right pr-8 transform transition-all duration-1000 ${visibleItems[service.id] ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`}
                           style={{ transitionDelay: visibleItems[service.id] ? `calc(${service.animDelay} + 300ms)` : '0ms' }}>
                        <OppositeText service={service} align="right" />
                      </div>
                    )}
                  </div>
                  
                  {/* Right side content */}
                  <div className={`w-1/2 pl-12 ${!isEven ? 'block' : 'hidden md:block'}`}>
                    {!isEven ? (
                      <div 
                        className={`ml-0 mr-auto w-full md:max-w-lg rounded-xl shadow-xl 
                          transform transition-all duration-1000
                          ${visibleItems[service.id] ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}
                          ${service.borderColor} overflow-hidden group`}
                        style={{ 
                          transitionDelay: visibleItems[service.id] ? service.animDelay : '0ms',
                          background: `linear-gradient(to bottom right, ${service.bgColor.replace('bg-', 'var(--')}, white)`
                        }}
                      >
                        {/* Card Content for right side */}
                        <ServiceCard service={service} />
                      </div>
                    ) : (
                      /* Text content for even items on the right side */
                      <div className={`text-left pl-8 transform transition-all duration-1000 ${visibleItems[service.id] ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                           style={{ transitionDelay: visibleItems[service.id] ? `calc(${service.animDelay} + 300ms)` : '0ms' }}>
                        <OppositeText service={service} align="left" />
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile view (stacked) */}
                  <div className="md:hidden w-full absolute left-1/2 transform -translate-x-1/2 pl-8">
                    <div 
                      className={`w-full max-w-sm mx-auto rounded-xl shadow-xl 
                        transform transition-all duration-1000
                        ${visibleItems[service.id] ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}
                        ${service.borderColor} overflow-hidden group`}
                      style={{ 
                        transitionDelay: visibleItems[service.id] ? service.animDelay : '0ms',
                        background: `linear-gradient(to bottom right, ${service.bgColor.replace('bg-', 'var(--')}, white)`
                      }}
                    >
                      {/* Card Content for mobile */}
                      <ServiceCard service={service} />
                      
                      {/* Mobile view opposite text */}
                      <div className="px-8 pb-6">
                        <hr className="my-4 border-t border-gray-200" />
                        <h4 className="text-lg font-semibold mb-2">{service.oppositeText.heading}</h4>
                        <ul>
                          {service.oppositeText.points.map((point, idx) => (
                            <li key={idx} className="flex items-start mb-2">
                              <ChevronRight size={16} className="text-emerald-500 mt-1 mr-1 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted card component to avoid duplication

import { useNavigate } from 'react-router-dom';

// Replace your existing ServiceCard component with this:
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    // Navigate to the appropriate page based on service id
    if (service.id === 1) {
      navigate('/services/energy-audit');
    } else if (service.id === 2) {
      navigate('/services/electrical-safety');
    }
    // Add more conditions for other services
  };

  return (
    <>
      {/* Image Section with hover effect */}
      <div className="h-56 overflow-hidden relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500"></div>
      </div>
      
      {/* Floating icon badge */}
      <div className="absolute top-48 right-6 transform -translate-y-1/2 p-3 rounded-full shadow-lg bg-white group-hover:scale-110 transition-transform duration-500">
        {service.icon}
      </div>
      
      {/* Content Section */}
      <div className="p-8 pt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
        
        <button 
          onClick={handleLearnMore}
          className="mt-6 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm font-medium transform group-hover:translate-x-1"
        >
          Learn More
          <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
    </>
  );
};
// New component for the opposite side text content
const OppositeText = ({ service, align }) => {
  return (
    <div className={`py-4 ${align === 'right' ? 'text-right' : 'text-left'}`}>
      <div className="inline-block">
        <h4 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600`}>
          {service.oppositeText.heading}
        </h4>
        
        <ul className={`space-y-3 ${align === 'right' ? 'pl-6' : 'pr-6'}`}>
          {service.oppositeText.points.map((point, idx) => (
            <li 
              key={idx} 
              className={`flex items-center transition-all duration-700 animate-fadeIn ${align === 'right' ? 'justify-end' : ''}`}
              style={{ animationDelay: `${idx * 300 + 600}ms` }}
            >
              <span className={`inline-block w-6 h-6 rounded-full flex items-center justify-center 
                ${idx % 4 === 0 ? 'bg-emerald-100 text-emerald-600' : 
                  idx % 4 === 1 ? 'bg-blue-100 text-blue-600' : 
                  idx % 4 === 2 ? 'bg-purple-100 text-purple-600' : 
                  'bg-amber-100 text-amber-600'} ${align === 'right' ? 'order-1' : 'order-0'}`}>
                <ChevronRight size={14} className="animate-bounce" />
              </span>
              <span className={`${align === 'right' ? 'mr-2 order-0' : 'ml-2 order-1'}`}>{point}</span>
            </li>
          ))}
        </ul>
        
        <div className={`w-32 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-6 
          ${align === 'right' ? 'ml-auto' : 'mr-auto'} transform transition-all duration-1000 animate-pulse`}></div>
      </div>
    </div>
  );
};

export default Services;