import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, Search, Tag, User, Bookmark, Share2, ThumbsUp, MessageCircle, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    // Fetch blog posts from your PHP backend
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost/EASCBackend/index.php?route=blogs");
        const data = await response.json();
        
        // Set the first post as featured
        if (data && data.length > 0) {
          setFeaturedPost(data[0]);
          setPosts(data.slice(1));
        }
        
        // Extract unique categories
        if (data && data.length > 0) {
          const allCategories = data.flatMap(post => post.categories || []);
          const uniqueCategories = [...new Set(allCategories)];
          setCategories(uniqueCategories);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Extract reading time (example implementation)
  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime > 0 ? readingTime : 1;
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our <span className="text-emerald-400">Blog</span></h1>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Insights, news, and knowledge about energy efficiency, auditing, and sustainable practices.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium cursor-pointer hover:bg-emerald-200 transition-colors">
                All Topics
              </span>
              {categories.slice(0, 3).map((category, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                  {category}
                </span>
              ))}
              {categories.length > 3 && (
                <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                  More...
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-emerald-100 absolute -top-5 -left-5 w-full h-full rounded-xl"></div>
                <div className="relative overflow-hidden rounded-xl shadow-lg aspect-w-16 aspect-h-9 bg-gray-200">
                  {featuredPost.image ? (
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center p-12">
                      <Bookmark size={64} className="text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(featuredPost.published || new Date())}</span>
                  <span className="mx-2">•</span>
                  <Clock size={16} className="mr-2" />
                  <span>{getReadingTime(featuredPost.content)} min read</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                
                <div className="flex gap-2 mb-6">
                  {featuredPost.categories?.map((category, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      {category}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 line-clamp-3">
                  {featuredPost.content?.slice(0, 300).replace(/<[^>]*>?/gm, '')}...
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <a 
                    href={`/blog/${featuredPost.slug}`} 
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center justify-center"
                  >
                    Read Full Article <ChevronRight size={18} className="ml-2" />
                  </a>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center text-gray-500">
                      <ThumbsUp size={18} className="mr-2" />
                      <span>{featuredPost.likes || 0}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MessageCircle size={18} className="mr-2" />
                      <span>{featuredPost.comments?.length || 0}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Share2 size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-medium text-gray-700 mb-4">No posts found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your search or browse all categories</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <Bookmark size={48} className="text-white opacity-50" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {post.categories?.slice(0, 2).map((category, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content?.slice(0, 150).replace(/<[^>]*>?/gm, '')}...
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(post.published || new Date())}</span>
                      </div>
                      
                      <a 
                        href={`/blog/${post.slug}`} 
                        className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center"
                      >
                        Read More <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredPosts.length > 0 && (
            <div className="flex justify-center mt-12">
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center">
                Load More <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="py-16 bg-white">
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated</h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest articles, tips, and insights on energy efficiency.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sidebar with Categories, Recent Posts and Tags - Mobile View */}
      <section className="py-12 bg-gray-50 md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Tag size={18} className="mr-2 text-emerald-600" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Recent Posts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock size={18} className="mr-2 text-emerald-600" />
                Recent Posts
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post, index) => (
                  <a key={index} href={`/blog/${post.slug}`} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                          <Bookmark size={20} className="text-white opacity-50" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 line-clamp-2">{post.title}</h4>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(post.published || new Date())}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Popular Tags */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Tag size={18} className="mr-2 text-emerald-600" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Energy Efficiency", "Sustainability", "Auditing", "Green Buildings", "Renewable Energy", "Conservation", "Technology"].map((tag, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;