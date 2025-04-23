import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Award, Users, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  // Optional: For counting up animation in stats
  const [counts, setCounts] = useState({ students: 0, courses: 0, years: 0 });
  
  // State for courses from API
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch courses from backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost/EASCBackend/index.php?route=listcourses");
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          // Get the most recent 3 courses to feature
          const courses = data.courses.slice(0, 3);
          setFeaturedCourses(courses);
        } else {
          throw new Error(data.message || 'Error fetching courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        students: prev.students < 2500 ? prev.students + 50 : 2500,
        courses: prev.courses < 6 ? prev.courses + 1 : 6,
        years: prev.years < 15 ? prev.years + 1 : 15
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Helper function to determine course level based on price
  const getCourseLevel = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice <= 1000) return "Beginner";
    if (numPrice <= 2000) return "Intermediate";
    return "Advanced";
  };

  // Helper to calculate estimated course duration
  const getCourseDuration = (description) => {
    // This is just an example logic, you might want to actually store duration in DB
    const words = description?.length || 0;
    const hours = Math.max(8, Math.round(words / 100));
    return `${hours} hours`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-screen bg-gradient-to-r from-gray-900 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
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
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="text-center md:text-left md:max-w-3xl">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-emerald-600/30 text-emerald-100 text-sm font-medium">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                ON-DEMAND COURSES
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Energy Auditors <br className="hidden md:block" />
              <span className="text-emerald-400">Study</span> Centre
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Master energy auditing skills with comprehensive courses designed for professionals. 
              Learn to optimize energy usage and implement sustainable solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/courses" 
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-medium text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
              >
                START COURSE
              </Link>
              <Link 
                to="/courses" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-medium text-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                ALL COURSES <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Energy Auditors Study Centre (EASC) is dedicated to training the next generation of energy efficiency professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Leading the Way in Energy Auditing Education
              </h3>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ullam architecto accusamus exercitationem magnam est autem sapiente dicta illum dolorum.
              </p>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, inventore. Tempore facere pariatur aspernatur quis minus sit at tenetur quidem.
              </p>
              
              <div className="flex flex-wrap gap-8 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600">{counts.students.toLocaleString()}+</div>
                  <div className="text-gray-500 mt-1">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600">{counts.courses}+</div>
                  <div className="text-gray-500 mt-1">Specialized Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600">{counts.years}+</div>
                  <div className="text-gray-500 mt-1">Years Experience</div>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className="mt-10 inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 bg-white rounded-lg hover:bg-emerald-50 transition-colors font-medium"
              >
                Learn More About EASC <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="bg-emerald-100 absolute top-0 left-0 w-full h-full rounded-2xl -rotate-3 transform"></div>
              <div className="bg-gray-200 absolute top-0 left-0 w-full h-full rounded-2xl rotate-3 transform"></div>
              <div className="relative aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-white">
                      <BookOpen size={40} className="mb-4 text-emerald-200" />
                      <h4 className="font-medium text-lg">Comprehensive Curriculum</h4>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-white">
                      <Award size={40} className="mb-4 text-emerald-200" />
                      <h4 className="font-medium text-lg">Certified Courses</h4>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-white">
                      <Users size={40} className="mb-4 text-emerald-200" />
                      <h4 className="font-medium text-lg">Expert Instructors</h4>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-white">
                      <Calendar size={40} className="mb-4 text-emerald-200" />
                      <h4 className="font-medium text-lg">Flexible Learning</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular training programs
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p>{error}</p>
              <p className="mt-4">Using fallback course data</p>
              {/* Display fallback courses */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    title: "Certified Energy Auditor",
                    level: "Advanced",
                    lessons: 24,
                    duration: "40 hours",
                    description: "Master the skills needed to conduct comprehensive energy audits and assessments.",
                    type: "cea" // Added type for routing
                  },
                  {
                    title: "Building Energy Modeling",
                    level: "Intermediate",
                    lessons: 18,
                    duration: "32 hours",
                    description: "Learn to create and analyze energy models for commercial and residential buildings.",
                    type: "cea" // Added type for routing
                  },
                  {
                    title: "Renewable Energy Integration",
                    level: "Intermediate",
                    lessons: 15,
                    duration: "28 hours",
                    description: "Discover strategies for incorporating renewable energy sources into existing systems.",
                    type: "cea" // Added type for routing
                  }
                ].map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => {
                // Determine course type based on title/content
                const courseType = determineCourseType(course);
                
                return (
                  <CourseCard 
                    key={course.id}
                    course={{
                      ...course,
                      level: getCourseLevel(course.price),
                      lessons: Math.floor(Math.random() * 10) + 15,
                      duration: getCourseDuration(course.description),
                      type: courseType // Add the determined type
                    }}
                    isApiData={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No courses available at this time.</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/courses/cem-exams" 
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              View All Courses <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to determine course type based on title or content
const determineCourseType = (course) => {
  const title = course.title?.toLowerCase() || '';
  const subject = course.subject?.toLowerCase() || '';
  const description = course.description?.toLowerCase() || '';
  
  // Check if course is CEM related
  if (
    title.includes('cem') || 
    subject.includes('cem') ||
    description.includes('certified energy manager') ||
    description.includes('energy manager certification') ||
    (course.paper && (course.paper.includes('1') || course.paper.toLowerCase().includes('cem')))
  ) {
    return 'cem';
  }
  
  // Check if course is CEA related
  if (
    title.includes('cea') || 
    title.includes('energy auditor') || 
    subject.includes('cea') ||
    description.includes('certified energy auditor') ||
    description.includes('energy auditing') ||
    (course.paper && (course.paper.includes('2') || course.paper.toLowerCase().includes('cea')))
  ) {
    return 'cea';
  }
  
  // Default to CEA if we can't determine
  return 'cea';
};

// Separate component for course cards
const CourseCard = ({ course, isApiData = false }) => {
  const navigate = useNavigate();
  
  const handleViewCourse = () => {
    if (course.id) {
      // Based on course type, navigate to the appropriate page
      if (course.type === 'cem') {
        navigate(`/courses/cem/${course.id}`);
      } else {
        navigate(`/courses/cea/${course.id}`);
      }
    } else {
      // Fallback if no ID is available
      if (course.type === 'cem') {
        navigate('/courses/cem');
      } else {
        navigate('/courses/cea');
      }
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-r from-emerald-600 to-emerald-400 flex items-center justify-center relative">
        {isApiData && course.display_image_url ? (
          <img 
            src={course.display_image_url} 
            alt={course.title} 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ''; // Fallback
              e.target.parentNode.classList.add('bg-gradient-to-r', 'from-emerald-600', 'to-emerald-400');
              // Add BookOpen icon as fallback
              const iconContainer = document.createElement('div');
              iconContainer.className = 'absolute inset-0 flex items-center justify-center';
              iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;
              e.target.parentNode.appendChild(iconContainer);
            }}
          />
        ) : (
          <BookOpen size={48} className="text-white" />
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">{course.level}</span>
          <span className="text-gray-500 text-sm">{course.duration}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
        <div className="flex justify-between items-center">
          {/* {isApiData && course.price ? (
            <div>
              {course.discounted_price && course.discounted_price !== "NULL" ? (
                <div className="flex items-center">
                  <span className="text-emerald-600 font-medium mr-2">₹{parseFloat(course.discounted_price).toLocaleString()}</span>
                  <span className="text-gray-500 text-sm line-through">₹{parseFloat(course.price).toLocaleString()}</span>
                </div>
              ) : (
                <span className="text-emerald-600 font-medium">₹{parseFloat(course.price).toLocaleString()}</span>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-500">{course.lessons} lessons</span>
          )} */}
          <button 
            onClick={handleViewCourse}
            className="text-emerald-600 font-medium flex items-center"
          >
            View Course <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;