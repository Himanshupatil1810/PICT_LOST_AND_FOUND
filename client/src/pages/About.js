import React from "react";
import {
  FaUniversity,
  FaInfo,
  FaHandsHelping,
  FaMapMarkerAlt,
  FaSearch,
  FaCheckCircle,
  FaUsers,
  FaClock,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 animate-fade-in">
          About Lost & Found - PICT College
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Connecting students with their lost belongings through an efficient
          lost and found system at Pune Institute of Computer Technology.
        </p>
      </div>

      {/* Quick Stats
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {[
          { icon: <FaSearch className="text-2xl" />, number: "500+", label: "Items Found" },
          { icon: <FaCheckCircle className="text-2xl" />, number: "400+", label: "Items Returned" },
          { icon: <FaUsers className="text-2xl" />, number: "1000+", label: "Students Helped" },
          { icon: <FaClock className="text-2xl" />, number: "24hrs", label: "Average Return Time" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-purple-600 mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-purple-700 mb-1">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div> */}

      {/* Mission & How It Works */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6 mx-auto">
            <FaUniversity className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-center leading-relaxed">
            To create a hassle-free environment where lost items find their way
            back to their rightful owners quickly and efficiently, reducing
            stress on campus.
          </p>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Our Values</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Honesty and Integrity</li>
              <li>✓ Quick Response Time</li>
              <li>✓ Student-Centric Approach</li>
              <li>✓ Secure Storage System</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6 mx-auto">
            <FaInfo className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            How It Works
          </h2>
          <ol className="text-gray-600 list-decimal pl-6 space-y-3 text-sm">
            <li>Found items are submitted to security guards at designated locations.</li>
            <li>Guards log in and upload item details with images and categories.</li>
            <li>Students browse or search for their lost items on the platform.</li>
            <li>Students visit the security office with ID to claim items.</li>
            <li>Items are marked as "delivered" after verification.</li>
          </ol>
          <div className="mt-6 bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-purple-700 mb-2">Pro Tips:</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Always check the lost items section regularly</li>
              <li>• Provide accurate descriptions when reporting lost items</li>
              <li>• Keep your student ID ready for verification</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-10 mb-20 shadow-lg">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Our Team
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
          Managed by PICT's security department and student welfare committee,
          our team ensures lost items are returned efficiently.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Security Department",
              desc: "Manages the lost and found office, verifies identities, and handles storage.",
              icon: <FaHandsHelping className="text-xl" />,
            },
            {
              title: "Student Welfare Committee",
              desc: "Promotes the service and gathers feedback to enhance the platform.",
              icon: <FaUsers className="text-xl" />,
            },
            {
              title: "Tech Team",
              desc: "Maintains the platform for a seamless and user-friendly experience.",
              icon: <FaInfo className="text-xl" />,
            },
          ].map((team, index) => (
            <div
              key={index}
              className="bg-purple-50 rounded-lg p-6 text-center hover:bg-purple-100 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 mb-4 mx-auto shadow-md">
                {team.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{team.title}</h3>
              <p className="text-gray-600 text-sm">{team.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visit Us */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Visit Us
        </h2>
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          <div className="bg-purple-50 rounded-lg p-6 w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-purple-600 text-xl mr-3" />
              <h3 className="font-semibold text-gray-800">SCTR'S Pune Institute of Computer Technology</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Survey No. 27, Near Trimurti Chowk
              <br />
              Dhankawadi, Pune - 411043
            </p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600">
                <strong className="text-purple-700">Office Hours:</strong> Mon-Sat, 9:00 AM - 5:00 PM
                <br />
                <strong className="text-purple-700">Contact:</strong> 020 2437 1101
                <br />
                <strong className="text-purple-700">Email:</strong> pict_guard@pict.edu
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.57618983173!2d73.8482586749613!3d18.45754208262376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac85230ba47%3A0x871eddd0a8a0a108!2sSCTR'S%20Pune%20Institute%20of%20Computer%20Technology!5e0!3m2!1sen!2sin!4v1744220778666!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="relative w-full" style={{ paddingBottom: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 