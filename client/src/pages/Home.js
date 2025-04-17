import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { getRecentItems } from '../services/itemService';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await getRecentItems(8);
        setRecentItems(response.data || response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recent items:', err);
        setError('Failed to load recent items');
        setLoading(false);
      }
    };
    
    fetchRecentItems();
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                PICT College Lost & Found Portal
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              <span className="block">Lost Something?</span>
              <span className="block text-indigo-200 mt-2">We'll Help You Find It</span>
            </h1>
            
            <p className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Find your lost belongings at PICT College Lost & Found portal. Quick, easy, and secure way to recover your items.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/lost-items"
                className="group relative px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition duration-300 shadow-lg transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Browse Lost Items</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/about"
                className="group relative px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🔍</span>
                </div>
                <div className="ml-3 text-left">
                  <div className="text-white font-semibold">Easy Search</div>
                  <div className="text-indigo-200 text-sm">Find items quickly</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="ml-3 text-left">
                  <div className="text-white font-semibold">Fast Recovery</div>
                  <div className="text-indigo-200 text-sm">Quick return process</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="ml-3 text-left">
                  <div className="text-white font-semibold">Secure</div>
                  <div className="text-indigo-200 text-sm">Safe & verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Simple steps to recover your lost items
            </p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  step: 1, 
                  title: "Report Found Items", 
                  desc: "Guards or admins add lost items found on campus with details and photos",
                  icon: "📝"
                },
                { 
                  step: 2, 
                  title: "Claim Your Item", 
                  desc: "Students browse and submit claims for their lost belongings",
                  icon: "🔍"
                },
                { 
                  step: 3, 
                  title: "Collect & Complete", 
                  desc: "Pick up items from college; admins mark them as delivered",
                  icon: "✅"
                }
              ].map((item, index) => (
                <div 
                  key={item.step} 
                  className="relative bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {item.icon}
                  </div>
                  <div className="mt-6 text-center">
                    <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                      Step {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Items Section */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 relative inline-block">
              Recently Found Items
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Latest items added to our database
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <p className="text-red-600 font-medium text-lg">{error}</p>
              <button 
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  getRecentItems(8)
                    .then(data => {
                      setRecentItems(data.data || data);
                      setLoading(false);
                    })
                    .catch(err => {
                      console.error('Error retrying:', err);
                      setError('Failed to load recent items');
                      setLoading(false);
                    });
                }}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentItems.length > 0 ? (
                recentItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image && item.image.url ? item.image.url : 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={item.name}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {item.status}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Found: {item.foundDate ? new Date(item.foundDate).toLocaleDateString() : 'Date not available'}
                        </div>
                        <Link
                          to={`/items/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
                        >
                          View Details <FaArrowRight className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">No items found recently</p>
                  <p className="mt-2 text-gray-500">Check back later or contact lost and found</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link
              to="/lost-items"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              View All Items <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Missing Something?
              </h2>
              <p className="text-xl text-indigo-100 mb-6">
                Explore our lost and found database now and recover your belongings quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/lost-items"
                  className="group relative px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition duration-300 shadow-lg transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Browse Items</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/about"
                  className="group relative px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">🔍</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Easy Search</h3>
                    <p className="text-indigo-200 text-sm">Find your items quickly</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Fast Recovery</h3>
                    <p className="text-indigo-200 text-sm">Quick return process</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Secure</h3>
                    <p className="text-indigo-200 text-sm">Safe & verified process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;