import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Award, Users, Calendar, Clock, Globe, Target, Lightbulb, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  // For counting animation in stats
  const [counts, setCounts] = useState({ students: 0, courses: 0, years: 0, experts: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        students: prev.students < 2500 ? prev.students + 50 : 2500,
        courses: prev.courses < 6 ? prev.courses + 1 : 6,
        years: prev.years < 15 ? prev.years + 1 : 15,
        experts: prev.experts < 12 ? prev.experts + 1 : 12
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Dr. Arun Kumar",
      position: "Founder & Lead Instructor",
      bio: "With over 15 years of experience in energy auditing and sustainability consulting, Dr. Kumar has led numerous high-impact projects across industrial and commercial sectors.",
      image: "https://via.placeholder.com/400"
    },
    {
      name: "Priya Sharma",
      position: "Senior Energy Consultant",
      bio: "Specializing in building energy modeling and renewable integration, Priya brings 10+ years of practical experience from her work with leading sustainability firms.",
      image: "https://via.placeholder.com/400"
    },
    {
      name: "Rajesh Verma",
      position: "Technical Director",
      bio: "An expert in industrial energy systems, Rajesh has helped organizations achieve significant energy savings through innovative auditing techniques and implementations.",
      image: "https://via.placeholder.com/400"
    },
    {
      name: "Anjali Patel",
      position: "Curriculum Developer",
      bio: "With a background in educational design and energy engineering, Anjali creates comprehensive learning materials that bridge theory and practical applications.",
      image: "https://via.placeholder.com/400"
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Animated dots background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 8 + 'px',
                height: Math.random() * 8 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.3
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About <span className="text-emerald-400">EASC</span></h1>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              We are dedicated to empowering professionals with the knowledge and skills 
              needed to lead the energy efficiency revolution.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-emerald-100 absolute -top-6 -left-6 w-full h-full rounded-2xl"></div>
              <div className="bg-gray-200 absolute -bottom-6 -right-6 w-full h-full rounded-2xl"></div>
              <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-4">{counts.years}</div>
                    <div className="text-2xl">Years of Excellence</div>
                    <div className="mt-8 grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{counts.students.toLocaleString()}+</div>
                        <div className="text-sm mt-1">Students Trained</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold">{counts.courses}+</div>
                        <div className="text-sm mt-1">Specialized Courses</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-emerald-600 mb-8"></div>
              
              <p className="text-gray-700 mb-6">
                {/* Founded in 2010, Energy Auditors Study Centre (EASC) was established with a mission to bridge the gap between theoretical knowledge and practical application in the field of energy management and auditing. */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione placeat doloremque impedit quam, consectetur accusamus aut ducimus temporibus amet deserunt a provident voluptates modi. Vel iure corrupti necessitatibus ut?
              </p>
              
              <p className="text-gray-700 mb-6">
                {/* What began as a small training initiative has grown into a premier institution for energy efficiency education. Our journey has been marked by continuous innovation in curriculum development, teaching methodologies, and industry partnerships. */}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, quibusdam illum velit explicabo commodi earum voluptatibus? Cumque, dolores explicabo. Id cupiditate voluptate ad cumque explicabo aut at reiciendis saepe voluptatum!
              </p>
              
              <p className="text-gray-700 mb-8">
                {/* Today, EASC stands as a beacon for aspiring energy auditors and sustainability professionals, offering comprehensive training programs that align with international standards and certification requirements. */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, itaque illum officiis excepturi placeat omnis, quis nisi quasi, pariatur quod soluta quam earum autem ratione minima maiores? Neque, maiores eum.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <CheckCircle size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Certified Programs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <CheckCircle size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Industry Partnerships</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <CheckCircle size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Practical Training</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 mx-auto">
                <Target size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Our Mission</h3>
              <p className="text-gray-600 text-center">
                To empower professionals with knowledge and skills in energy efficiency through 
                innovative education, practical training, and industry collaboration.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 mx-auto">
                <Globe size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Our Vision</h3>
              <p className="text-gray-600 text-center">
                To be the global leader in energy auditing education, shaping the future 
                of sustainable energy management through excellence in teaching and research.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 mx-auto">
                <Lightbulb size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Our Values</h3>
              <p className="text-gray-600 text-center">
                Excellence, Innovation, Integrity, Sustainability, and Collaboration 
                guide our approach to education and professional development.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose EASC</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              What makes our training programs stand out from the rest
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen size={32} className="text-emerald-600" />,
                title: "Comprehensive Curriculum",
                description: "Our courses cover all aspects of energy auditing, from theoretical foundations to advanced techniques."
              },
              {
                icon: <Users size={32} className="text-emerald-600" />,
                title: "Expert Instructors",
                description: "Learn from industry veterans with decades of combined experience in energy auditing and management."
              },
              {
                icon: <Award size={32} className="text-emerald-600" />,
                title: "Industry Recognition",
                description: "Our certifications are valued by employers and align with international standards."
              },
              {
                icon: <Clock size={32} className="text-emerald-600" />,
                title: "Flexible Learning",
                description: "Choose from online, in-person, or hybrid learning options to fit your schedule and preferences."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the professionals behind our success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-56 bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center">
                  <Users size={48} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                // quote: "The training I received at EASC completely transformed my approach to energy auditing. The practical exercises and case studies were invaluable.",
                quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repellat ea itaque, delectus ipsum officiis quos rerum laboriosam quae optio mollitia quidem quas voluptatibus accusantium. Repellendus rem maiores est dolores.",
                name: "Vikram Mehta",
                position: "Senior Energy Manager, Tech Solutions Inc."
              },
              {
                // quote: "EASC's certification program prepared me perfectly for my current role. The instructors' real-world experience made all the difference in my learning.",
                quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repellat ea itaque, delectus ipsum officiis quos rerum laboriosam quae optio mollitia quidem quas voluptatibus accusantium. Repellendus rem maiores est dolores.",
                name: "Sunita Rajput",
                position: "Energy Consultant, Green Buildings Ltd."
              },
              {
                // quote: "The blend of theoretical knowledge and hands-on training at EASC gave me the confidence to tackle complex energy auditing projects right from day one.",
                quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repellat ea itaque, delectus ipsum officiis quos rerum laboriosam quae optio mollitia quidem quas voluptatibus accusantium. Repellendus rem maiores est dolores.",
                name: "Mohan Krishnan",
                position: "Facility Manager, Industrial Dynamics"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl relative">
                <div className="text-5xl text-emerald-300 opacity-30 absolute top-4 left-4">"</div>
                <p className="text-white/90 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mr-4">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-emerald-200">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-emerald-900 rounded-2xl p-12 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            
            {/* Animated dots */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 6 + 'px',
                    height: Math.random() * 6 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.5 + 0.3
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Begin Your Journey?</h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have advanced their careers with our industry-leading courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/courses" 
                  className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-medium text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                >
                  Explore Courses
                </a>
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-medium text-lg hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  Contact Us <ArrowRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;