import { useState, useEffect, useRef } from 'react';
import { Zap, Shield, BadgeCheck, Leaf, LineChart, PieChart, Lightbulb, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      icon: <PieChart size={36} className="text-emerald-600" />,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      image: energyAuditImg,
      animDelay: "100ms",
      path: "/services/energy-audit"
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
      icon: <Shield size={36} className="text-blue-600" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: electricalSafetyImg,
      animDelay: "200ms",
      path: "/services/electrical-safety"
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
      icon: <BadgeCheck size={36} className="text-purple-600" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      image: naacAuditImg,
      animDelay: "300ms",
      path: "/services/naac-audit"
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
      icon: <Leaf size={36} className="text-green-600" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      image: carbonCreditImg,
      animDelay: "400ms",
      path: "/services/carbon-credit"
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
      icon: <LineChart size={36} className="text-amber-600" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      image: patConsultancyImg,
      animDelay: "500ms",
      path: "/services/pat-consultancy"
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
      icon: <Zap size={36} className="text-rose-600" />,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      image: powerAssessmentImg,
      animDelay: "600ms",
      path: "/services/power-assessment"
    },
    {
      id: 7,
      title: "Electrical Consultancy",
      description: "Expert guidance on electrical system design, upgrades, and regulatory compliance to ensure safety, efficiency, and sustainability across all electrical infrastructure.",
      oppositeText: {
        heading: "Consultancy Expertise",
        points: [
          "Custom system design",
          "Regulatory compliance guidance", 
          "Cost-effective solutions",
          "Future-proofed infrastructure"
        ]
      },
      icon: <Lightbulb size={36} className="text-indigo-600" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      image: electricalConsultancyImg,
      animDelay: "700ms",
      path: "/services/electrical-consultancy"
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

  // Service Card Component
  const ServiceCard = ({ service }) => {
    const handleLearnMore = () => {
      navigate(service.path);
    };

    return (
      <>
        {/* Image Section with hover effect */}
        <div className="h-48 sm:h-56 overflow-hidden relative">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500"></div>
        </div>
        
        {/* Floating icon badge */}
        <div className="absolute top-40 sm:top-48 right-6 transform -translate-y-1/2 p-2 sm:p-3 rounded-full shadow-lg bg-white group-hover:scale-110 transition-transform duration-500">
          {service.icon}
        </div>
        
        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{service.title}</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
          
          <button 
            onClick={handleLearnMore}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm font-medium transform group-hover:translate-x-1"
          >
            Learn More
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </div>
      </>
    );
  };

  // Opposite Text Component
  const OppositeText = ({ service, align }) => {
    return (
      <div className={`py-2 sm:py-4 ${align === 'right' ? 'text-right' : 'text-left'}`}>
        <div className="inline-block">
          <h4 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600`}>
            {service.oppositeText.heading}
          </h4>
          
          <ul className={`space-y-2 sm:space-y-3 ${align === 'right' ? 'pl-4 sm:pl-6' : 'pr-4 sm:pr-6'}`}>
            {service.oppositeText.points.map((point, idx) => (
              <li 
                key={idx} 
                className={`flex items-center transition-all duration-700 animate-fadeIn ${align === 'right' ? 'justify-end' : ''}`}
                style={{ animationDelay: `${idx * 200 + 400}ms` }}
              >
                <span className={`inline-block w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center 
                  ${idx % 4 === 0 ? 'bg-emerald-100 text-emerald-600' : 
                    idx % 4 === 1 ? 'bg-blue-100 text-blue-600' : 
                    idx % 4 === 2 ? 'bg-purple-100 text-purple-600' : 
                    'bg-amber-100 text-amber-600'} ${align === 'right' ? 'order-1 ml-2' : 'order-0 mr-2'}`}>
                  <ChevronRight size={12} className="animate-pulse" />
                </span>
                <span className="text-sm sm:text-base">{point}</span>
              </li>
            ))}
          </ul>
          
          <div className={`w-16 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-4 sm:mt-6 
            ${align === 'right' ? 'ml-auto' : 'mr-auto'} transform transition-all duration-1000 animate-pulse`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-24 md:pt-28 pb-12 sm:pb-16 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-emerald-300 to-blue-300 blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-yellow-300 to-green-300 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header section with animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 mb-4 sm:mb-6 transform transition-all duration-1000 ${
              headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Our Services
          </h1>
          <div 
            className={`w-24 sm:w-32 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6 sm:mb-8 rounded-full transform transition-all duration-1000 delay-300 ${
              headerVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          ></div>
          <p 
            className={`max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transform transition-all duration-1000 delay-500 ${
              headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Expert energy audit and electrical consultancy solutions to optimize 
            performance, ensure safety, and achieve sustainability goals.
          </p>
        </div>

        {/* Desktop Timeline section (hidden on mobile) */}
        <div className="hidden md:block relative">
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
                  className="flex items-center mb-20 md:mb-24 service-item relative"
                  style={{
                    marginBottom: index === services.length - 1 ? '0' : undefined
                  }}
                >
                  {/* Animated Timeline dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 border-4 border-white shadow-lg z-10 
                    transition-all duration-700 ${visibleItems[service.id] ? 'scale-100' : 'scale-0'}`}>
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-75"></span>
                  </div>
                  
                  {/* Left side content */}
                  <div className="w-1/2 pr-12">
                    {isEven ? (
                      <div 
                        className={`ml-auto mr-0 w-full max-w-lg rounded-xl shadow-xl 
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
                  <div className="w-1/2 pl-12">
                    {!isEven ? (
                      <div 
                        className={`ml-0 mr-auto w-full max-w-lg rounded-xl shadow-xl 
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
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile view (stacked services) */}
        <div className="md:hidden space-y-10 sm:space-y-12">
          {services.map((service) => (
            <div 
              key={service.id}
              data-id={service.id}
              className="service-item"
            >
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
                {/* Card Content */}
                <ServiceCard service={service} />
                
                {/* Benefits section */}
                <div className="px-4 sm:px-6 pb-6">
                  <hr className="my-4 border-t border-gray-200" />
                  <h4 className="text-lg font-semibold mb-2">{service.oppositeText.heading}</h4>
                  <ul className="space-y-2">
                    {service.oppositeText.points.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm sm:text-base">
                        <ChevronRight size={16} className="text-emerald-500 mt-1 mr-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Decorative line for visual separation */}
              {service.id !== services.length && (
                <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mx-auto mt-6 opacity-50"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;