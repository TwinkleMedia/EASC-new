import { useState, useEffect } from 'react';
import { PieChart, BarChart, ArrowLeft, CheckCircle, AlertTriangle, FileCheck, Download, Clock } from 'lucide-react';
import energyAuditImg from "../../../assets/services/energy-audits.jpg";
 import auditProcessImg from "../../../assets/services/process.jfif";
 import savingsChartImg from "../../../assets/services/saving.jfif";
 import certificateImg from "../../../assets/services/Energy-certificate.jpg";
 import "../Pages.css";

const EnergyAuditPage = () => {
  const [visibleSections, setVisibleSections] = useState({});
  
  // Animation for elements when they come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          setVisibleSections(prev => ({ ...prev, [id]: true }));
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    document.querySelectorAll('.animate-section').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  // Animation for header elements
  const [headerVisible, setHeaderVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Energy audit process steps
  const auditSteps = [
    {
      title: "Initial Assessment",
      description: "Comprehensive review of energy bills, facility layouts, and operational patterns to establish baseline consumption.",
      icon: <FileCheck size={28} className="text-emerald-600" />,
      color: "emerald"
    },
    {
      title: "On-site Inspection",
      description: "Detailed examination of electrical systems, HVAC, lighting, building envelope, and production equipment.",
      icon: <AlertTriangle size={28} className="text-blue-600" />,
      color: "blue"
    },
    {
      title: "Data Analysis",
      description: "Advanced analytics to identify energy usage patterns, inefficiencies, and opportunities for optimization.",
      icon: <BarChart size={28} className="text-purple-600" />,
      color: "purple"
    },
    {
      title: "Report Generation",
      description: "Comprehensive audit report with prioritized recommendations, implementation costs, and ROI calculations.",
      icon: <Download size={28} className="text-amber-600" />,
      color: "amber"
    },
    {
      title: "Implementation Support",
      description: "Guidance on executing recommended measures with vendor selection and project management assistance.",
      icon: <CheckCircle size={28} className="text-green-600" />,
      color: "green"
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: "Cost Reduction",
      description: "Reduce energy expenses by 5-30% through identification and elimination of wasteful practices.",
      icon: <PieChart size={24} className="text-emerald-600" />
    },
    {
      title: "Enhanced Efficiency",
      description: "Optimize equipment performance and operational processes to maximize productivity.",
      icon: <BarChart size={24} className="text-blue-600" />
    },
    {
      title: "Regulatory Compliance",
      description: "Meet government and industry energy efficiency standards and requirements.",
      icon: <FileCheck size={24} className="text-purple-600" />
    },
    {
      title: "Sustainability Goals",
      description: "Reduce carbon footprint and demonstrate environmental responsibility to stakeholders.",
      icon: <CheckCircle size={24} className="text-green-600" />
    }
  ];

  // Sample success metrics
  const successMetrics = [
    { name: "Average Energy Savings", value: "23%", color: "emerald" },
    { name: "ROI Timeframe", value: "12-18 Months", color: "blue" },
    { name: "Carbon Reduction", value: "540 Tons/Year", color: "purple" },
    { name: "Client Satisfaction", value: "97%", color: "amber" }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16 min-h-screen overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-300 to-blue-300 blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-300 to-green-300 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <button onClick={() => window.history.back()} className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-300">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Services</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16 shadow-xl">
          <div className="h-96 w-full">
            <img 
              src={energyAuditImg} 
              alt="Energy Audit Service" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-3xl mx-auto px-8 sm:px-16">
              <div 
                className={`transform transition-all duration-1000 ${
                  headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-white/90 shadow-lg mr-4">
                    <PieChart size={32} className="text-emerald-600" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white">Energy Audit</h1>
                </div>
                <div 
                  className={`w-32 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 mb-6 rounded-full transform transition-all duration-1000 delay-300 ${
                    headerVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                ></div>
                <p 
                  className={`text-xl text-white/90 leading-relaxed max-w-2xl transform transition-all duration-1000 delay-500 ${
                    headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  Comprehensive energy consumption assessment to identify efficiency opportunities, 
                  reduce wastage, and optimize energy usage across residential, commercial, and 
                  industrial facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section 
          data-section="overview"
          className="mb-24 animate-section"
        >
          <div className={`transition-all duration-1000 transform ${
            visibleSections.overview ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What is an Energy Audit?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  An energy audit is a systematic analysis of energy usage patterns within a facility. 
                  Our expert auditors examine all energy-consuming systems to identify inefficiencies, 
                  wastage points, and opportunities for optimization.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Using advanced diagnostic tools and industry benchmarks, we create a comprehensive 
                  profile of your energy consumption and develop tailored recommendations to reduce 
                  costs while maintaining or improving operational performance.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether you're looking to reduce utility bills, meet compliance requirements, or 
                  achieve sustainability targets, our energy audit services provide the data-driven 
                  insights needed to make informed decisions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
                <h3 className="text-xl font-semibold text-emerald-700 mb-4">Types of Energy Audits We Offer</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="p-1.5 rounded-full bg-emerald-100 mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-medium">Level 1: Walk-through Assessment</span>
                      <p className="mt-1 text-gray-600">Identifies simple improvements with rapid payback periods.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1.5 rounded-full bg-emerald-100 mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-medium">Level 2: Detailed Analysis</span>
                      <p className="mt-1 text-gray-600">Comprehensive evaluation with financial analysis and prioritized recommendations.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1.5 rounded-full bg-emerald-100 mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-medium">Level 3: Investment-grade Audit</span>
                      <p className="mt-1 text-gray-600">In-depth analysis with detailed project costs and financing options.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1.5 rounded-full bg-emerald-100 mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-medium">Specialized Audits</span>
                      <p className="mt-1 text-gray-600">Focused on specific systems like HVAC, lighting, or production equipment.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section 
          data-section="process"
          className="mb-24 animate-section"
        >
          <div className={`transition-all duration-1000 transform ${
            visibleSections.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Audit Process</h2>
            
            <div className="relative mb-16">
              <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-emerald-300 to-blue-300 transform -translate-x-1/2"></div>
              
              {auditSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex md:items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ 
                    opacity: visibleSections.process ? 1 : 0,
                    transform: visibleSections.process ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.8s ease ${300 + index * 200}ms`
                  }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-lg z-10 items-center justify-center" style={{ background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`, '--tw-gradient-from': `rgb(var(--${step.color}-500))`, '--tw-gradient-to': `rgb(var(--${step.color}-600))`}}>
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-75"></span>
                  </div>
                  
                  {/* Step content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                      <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2 rounded-lg mr-3 ${index % 2 === 0 ? 'order-1 ml-3 mr-0' : ''}`} style={{ background: `rgb(var(--${step.color}-50))` }}>
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: `rgb(var(--${step.color}-700))` }}>{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Empty space for timeline */}
                  <div className="hidden md:block w-2/12"></div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={auditProcessImg} 
                  alt="Energy Audit Process" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">Comprehensive Analysis</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our energy audit methodology follows international standards including ISO 50002 
                  and ASHRAE procedures. We utilize state-of-the-art thermal imaging, power quality 
                  analyzers, and data loggers to capture accurate consumption patterns and identify 
                  optimization opportunities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Each audit concludes with a detailed report and presentation to stakeholders, 
                  outlining findings, recommendations, and an implementation roadmap with clear ROI projections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section 
          data-section="benefits"
          className="mb-24 animate-section"
        >
          <div className={`transition-all duration-1000 transform ${
            visibleSections.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">Benefits of Our Energy Audit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                  style={{ 
                    opacity: visibleSections.benefits ? 1 : 0,
                    transform: visibleSections.benefits ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.8s ease ${300 + index * 150}ms`
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 mr-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">Measurable Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our energy audits have helped organizations achieve significant reductions in energy 
                  consumption and operational costs. Clients typically see ROI within 12-18 months of 
                  implementing our recommendations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Beyond cost savings, our audits help organizations meet sustainability goals, enhance 
                  equipment longevity, improve workspace comfort, and comply with energy efficiency regulations.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {successMetrics.map((metric, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-4 rounded-lg shadow border border-gray-100"
                    >
                      <p className="text-sm text-gray-500 mb-1">{metric.name}</p>
                      <p className={`text-2xl font-bold text-${metric.color}-600`}>{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={savingsChartImg} 
                  alt="Energy Savings Chart" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Certification Section */}
        <section 
          data-section="compliance"
          className="mb-24 animate-section"
        >
          <div className={`transition-all duration-1000 transform ${
            visibleSections.compliance ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Compliance & Certification</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={certificateImg} 
                  alt="Energy Certification" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">Certified Energy Auditors</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our energy audits are performed by certified professionals with extensive experience 
                  across various industries. All audits comply with national and international standards, 
                  including ISO 50001 Energy Management System requirements.
                </p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5 mt-4">
                  <h4 className="text-lg font-semibold text-emerald-700 mb-3">Our audits help you meet requirements for:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle size={18} className="text-emerald-500 mr-2" />
                      <span>Bureau of Energy Efficiency (BEE) compliance</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={18} className="text-emerald-500 mr-2" />
                      <span>ECBC (Energy Conservation Building Code)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={18} className="text-emerald-500 mr-2" />
                      <span>LEED and GRIHA certification points</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={18} className="text-emerald-500 mr-2" />
                      <span>PAT (Perform, Achieve, Trade) scheme</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={18} className="text-emerald-500 mr-2" />
                      <span>Corporate ESG reporting requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section 
          data-section="cta"
          className="animate-section"
        >
          <div 
            className={`bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-xl p-8 md:p-12 text-white transition-all duration-1000 transform ${
              visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-4">Ready to optimize your energy consumption?</h2>
                <p className="text-lg text-white/90 mb-6">
                  Let our experts identify energy-saving opportunities in your facility. Our comprehensive 
                  audits provide actionable insights with measurable ROI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    Schedule an Audit
                    <Clock size={18} className="ml-2" />
                  </button>
                  <button className="px-8 py-3 bg-emerald-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-emerald-800 transition-all duration-300">
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center p-6">
                  <PieChart size={64} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default EnergyAuditPage;