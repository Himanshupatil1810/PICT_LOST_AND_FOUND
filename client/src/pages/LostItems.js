import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ItemCard from '../components/ItemCard';
import { getAllItems, searchItems } from '../services/itemService';
import { FaSearch, FaFilter, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Function to get the proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/placeholder.png';
    
    // If imagePath is an object with url property (Cloudinary structure)
    if (typeof imagePath === 'object' && imagePath.url) {
      return imagePath.url;
    }
    
    // If it's a string and a full URL already, return as is
    if (typeof imagePath === 'string' && imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the server URL
    return `http://localhost:5000${imagePath}`;
  };
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
        setFilteredItems(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load items');
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  // Handle search
  const handleSearch = async (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // Reset to all items if search is empty
      setFilteredItems(items);
      return;
    }
    
    try {
      setLoading(true);
      const results = await searchItems(term);
      
      // Apply category filter to search results if needed
      if (selectedCategory) {
        setFilteredItems(results.filter(item => item.category === selectedCategory));
      } else {
        setFilteredItems(results);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Search failed. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle category filter
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    if (category) {
      setFilteredItems(items.filter(item => item.category === category));
    } else {
      setFilteredItems(items);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setFilteredItems(items);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl font-bold mb-2">Lost Items</h1>
              <p className="text-indigo-100 text-lg">
                Browse through our collection of lost items and find what you're looking for
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-indigo-100 hover:text-white transition duration-300"
              >
                <FaArrowLeft className="mr-2" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-indigo-400" />
                </div>
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaFilter className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-sm font-medium text-indigo-700">Filter by:</span>
              </div>
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedCategory || searchTerm) && (
            <div className="mt-4 flex items-center flex-wrap gap-2">
              <span className="text-sm text-indigo-700">Active filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Search: {searchTerm}
                  <button 
                    onClick={() => handleSearch('')}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
              <button 
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-md">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-indigo-600">Loading items...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center">
              <FaExclamationTriangle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Something went wrong</h3>
            <p className="mt-2 text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {filteredItems.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-indigo-700">
                    Showing <span className="font-medium">{filteredItems.length}</span> {filteredItems.length === 1 ? 'item' : 'items'}
                    {selectedCategory ? ` in <span className="font-medium">${selectedCategory}</span>` : ''}
                  </p>
                  <div className="text-sm text-indigo-600">
                    <Link to="/report-item" className="hover:text-indigo-800 transition duration-300">
                      Can't find your item? Report it here
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <ItemCard key={item._id} item={item} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg 
                  className="mx-auto h-16 w-16 text-indigo-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">No items found</h3>
                <p className="mt-2 text-indigo-600">
                  {selectedCategory 
                    ? `No items found in the ${selectedCategory} category.` 
                    : 'No items match your search criteria.'}
                </p>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    Clear filters
                  </button>
                  <div className="text-sm text-indigo-600">
                    <Link to="/report-item" className="hover:text-indigo-800 transition duration-300">
                      Can't find your item? Report it here
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LostItems;