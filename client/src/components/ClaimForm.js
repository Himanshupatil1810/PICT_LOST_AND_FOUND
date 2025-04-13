import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { claimItem } from '../services/itemService';
import { AuthContext } from '../context/AuthContext';

const ClaimForm = ({ itemId, onClaimSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to claim items');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Build claim data object with user information
      const claimData = {
        studentName: user.name,
        studentId: user.registrationId,
        studentYear: '', // This field is not stored in user data, so we'll leave it empty
        contactNumber: user.mobileNumber,
        claimedDate: new Date().toISOString()
      };
      
      console.log('Submitting claim data:', claimData);
      
      // Use the API to claim the item
      const response = await claimItem(itemId, claimData);
      console.log('Claim response:', response);
      
      // Notify parent component
      if (onClaimSubmitted) {
        onClaimSubmitted();
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      toast.error(error.message || 'Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Claim This Item</h2>
      <p className="mb-4 text-gray-600">
        Please review your information before claiming the item. You will need to verify your identity with the security guard.
      </p>
      
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <div className="text-gray-900">{user?.name || 'Not available'}</div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Registration ID</label>
          <div className="text-gray-900">{user?.registrationId || 'Not available'}</div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
          <div className="text-gray-900">{user?.mobileNumber || 'Not available'}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Claim'}
        </button>
      </div>
    </div>
  );
};

export default ClaimForm;