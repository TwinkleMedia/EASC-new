// import { useState, useEffect } from 'react';
// import { ArrowRight, BookOpen, Award, Users, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Banner = () => {
//   // Optional: For counting up animation in stats
//   const [counts, setCounts] = useState({ students: 0, courses: 0, years: 0 });
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounts(prev => ({
//         students: prev.students < 2500 ? prev.students + 50 : 2500,
//         courses: prev.courses < 50 ? prev.courses + 1 : 50,
//         years: prev.years < 15 ? prev.years + 1 : 15
//       }));
//     }, 50);
    
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Hero Banner Section */}
//       <section className="relative h-screen bg-gradient-to-r from-gray-900 to-emerald-900 overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
        
//         {/* Optional: Animated dots background */}
//         <div className="absolute inset-0 opacity-20">
//           {[...Array(20)].map((_, i) => (
//             <div 
//               key={i}
//               className="absolute rounded-full bg-white"
//               style={{
//                 width: Math.random() * 8 + 'px',
//                 height: Math.random() * 8 + 'px',
//                 top: Math.random() * 100 + '%',
//                 left: Math.random() * 100 + '%',
//                 opacity: Math.random() * 0.5 + 0.3
//               }}
//             ></div>
//           ))}
//         </div>
        
//         <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
//           <div className="text-center md:text-left md:max-w-3xl">
//             <div className="inline-block px-3 py-1 mb-6 rounded-full bg-emerald-600/30 text-emerald-100 text-sm font-medium">
//               <span className="flex items-center">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
//                 ON-DEMAND COURCES
//               </span>
//             </div>
            
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//               Energy Auditors <br className="hidden md:block" />
//               <span className="text-emerald-400">Study</span> Centre
//             </h1>
            
//             <p className="text-xl text-gray-200 mb-8 max-w-2xl">
//               Master energy auditing skills with comprehensive courses designed for professionals. 
//               Learn to optimize energy usage and implement sustainable solutions.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <Link 
//                 to="/courses" 
//                 className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-medium text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
//               >
//                 START COURSE
//               </Link>
//               <Link 
//                 to="/courses" 
//                 className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-medium text-lg hover:bg-white/20 transition-colors flex items-center justify-center"
//               >
//                 ALL COURSES <ArrowRight size={18} className="ml-2" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Banner;