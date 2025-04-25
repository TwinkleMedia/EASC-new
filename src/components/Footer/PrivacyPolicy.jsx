import { useState } from 'react';
import { Shield, Lock, Eye, CheckCircle, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = ({ isModal = false }) => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    {
      id: 0,
      title: "Information Collection",
      icon: <Eye size={24} />,
      content: "We collect limited personal information necessary to provide our services, including your name, email address, contact details, and professional information related to energy auditing."
    },
    {
      id: 1,
      title: "Data Protection",
      icon: <Lock size={24} />,
      content: "Your data is secured using industry-standard encryption and security protocols. We implement technical safeguards to prevent unauthorized access, disclosure, or breach of your personal information."
    },
    {
      id: 2,
      title: "Information Usage",
      icon: <Shield size={24} />,
      content: "We use your information to provide educational services, process payments, send relevant communications, and improve our course offerings to better meet the needs of energy professionals."
    },
    {
      id: 3,
      title: "Your Rights",
      icon: <CheckCircle size={24} />,
      content: "You have the right to access, correct, or delete your personal information at any time. Contact us at privacy@easc.com to exercise these rights or ask questions about our privacy practices."
    }
  ];
  
  return (
<div className={isModal ? "" : "min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"}>
      <div className="max-w-4xl mx-auto">
        {/* Header - conditionally hide the back button if in modal */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Shield className="mr-3 text-emerald-400" size={32} />
            Privacy Policy
          </h1>
          {!isModal && (
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft size={20} className="mr-1" /> Back
            </button>
          )}
        </div>
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-xl p-6 mb-10 border border-emerald-600/30">
          <p className="text-emerald-400 text-lg">
            At Energy Auditors Study Centre, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>
          <p className="text-gray-300 mt-3">
            Last updated: April 2025
          </p>
        </div>
        
        {/* Section Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {sections.map(section => (
            <button
              key={section.id}
              className={`p-4 rounded-lg flex flex-col items-center text-center transition-all ${
                activeSection === section.id 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className={`p-3 rounded-full mb-2 ${
                activeSection === section.id ? "bg-emerald-500" : "bg-gray-700"
              }`}>
                {section.icon}
              </div>
              <span className="text-sm font-medium">{section.title}</span>
            </button>
          ))}
        </div>
        
        {/* Content Section */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl mb-10 animate-fadeIn transition-all duration-300 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <div className="p-2 bg-emerald-600 rounded-full mr-3">
              {sections[activeSection].icon}
            </div>
            {sections[activeSection].title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {sections[activeSection].content}
          </p>
        </div>
        
        {/* Contact Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Questions About Our Privacy Policy?</h3>
          <p className="text-gray-300 mb-6">
            If you have any questions or concerns about our privacy practices, please don't hesitate to contact our privacy team.
          </p>
          <a 
            href="mailto:privacy@easc.com" 
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Contact Privacy Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;