import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about a lost item or need help with the platform? Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-800 mb-4 mx-auto">
            <FaPhone className="text-2xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Phone</h3>
          <p className="text-gray-600">
            Lost & Found Office: 020 2437 1101<br />
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-800 mb-4 mx-auto">
            <FaEnvelope className="text-2xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Email</h3>
          <p className="text-gray-600">
            pict_guard@pict.edu<br />
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-800 mb-4 mx-auto">
            <FaMapMarkerAlt className="text-2xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
          <p className="text-gray-600">
            PICT College, Survey No. 27<br />
            Near Trimurti Chowk, Dhankawadi<br />
            Pune - 411043
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Office Hours</h2>
          <div className="mb-6">
            <p className="text-gray-600 mb-2"><strong>Monday to Friday:</strong> 9:00 AM - 5:00 PM</p>
            <p className="text-gray-600 mb-2"><strong>Saturday:</strong> 10:00 AM - 2:00 PM</p>
            <p className="text-gray-600"><strong>Sunday:</strong> Closed</p>
          </div>
          
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Emergency Contact</h3>
          <p className="text-gray-600">
            For urgent matters related to lost valuable items, please contact the campus security directly at:
          </p>
          <p className="font-medium text-blue-800 mt-2">+91 9988999899</p>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Campus View</h3>
            <div className="border-2 border-blue-200 rounded-lg overflow-hidden shadow-md max-w-4xl mx-auto">
              <img 
                src="/pict_clg_image.jpg" 
                alt="PICT College Campus" 
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">PICT College Campus - Main Building</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;