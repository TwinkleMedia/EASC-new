import { useState } from 'react';
import { FileText, BookOpen, UserCheck, AlertCircle, ArrowLeft, Check,Shield } from 'lucide-react';

const TermsOfService = ({ isModal = false }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };
  
  const sections = [
    {
      id: 0,
      title: "Account Terms",
      icon: <UserCheck size={24} />,
      content: "By creating an account with EASC, you agree to provide accurate information and maintain the security of your login credentials. You are responsible for all activities that occur under your account."
    },
    {
      id: 1,
      title: "Course Access",
      icon: <BookOpen size={24} />,
      content: "Upon purchase, you receive access to course materials for the specified duration. Materials are for personal use only and may not be shared, distributed, or reproduced without written permission."
    },
    {
      id: 2,
      title: "Certification",
      icon: <FileText size={24} />,
      content: "Certifications are awarded upon successful completion of course requirements. EASC reserves the right to revoke certification for violation of professional standards or misrepresentation of credentials."
    },
    {
      id: 3,
      title: "Limitation of Liability",
      icon: <AlertCircle size={24} />,
      content: "EASC is not liable for any damages arising from the use of our services or inability to access our services. Our total liability shall not exceed the amount paid for the specific service in question."
    }
  ];
  
  const highlights = [
    "Expert-led energy auditing training",
    "Industry-recognized certification",
    "Lifetime access to course updates",
    "Professional community membership"
  ];
  
  return (
<div className={isModal ? "" : "min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"}>
      <div className="max-w-4xl mx-auto">
        {/* Header - conditionally hide the back button if in modal */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Shield className="mr-3 text-emerald-400" size={32} />
            Term Of Service
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
            Please read these terms carefully before accessing or using the services provided by Energy Auditors Study Centre.
          </p>
          <p className="text-gray-300 mt-3">
            Last updated: April 2025
          </p>
        </div>
        
        {/* Highlights Section */}
        <div className="mb-10 p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">What You Get With EASC</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                <div className="p-2 bg-emerald-600 rounded-full mr-3">
                  <Check size={16} />
                </div>
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Expandable Sections */}
        <div className="space-y-4 mb-10">
          {sections.map(section => (
            <div 
              key={section.id} 
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-600/20 rounded-lg mr-3 text-emerald-400">
                    {section.icon}
                  </div>
                  <span className="text-lg font-medium text-white">{section.title}</span>
                </div>
                <div className={`transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                  <ArrowLeft className="rotate-90 text-emerald-400" size={20} />
                </div>
              </button>
              
              {expandedSection === section.id && (
                <div className="p-5 pt-0 border-t border-gray-700 animate-slideDown">
                  <p className="text-gray-300">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Agreement Section */}
        <div className="bg-emerald-600/10 rounded-xl p-6 border border-emerald-600/30">
          <h3 className="text-xl font-bold text-white mb-4">Acceptance of Terms</h3>
          <p className="text-gray-300 mb-6">
            By accessing our website, enrolling in courses, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <div className="flex justify-center">
            <button 
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              onClick={() => window.history.back()}
            >
              I Understand and Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;