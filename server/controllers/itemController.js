const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort('-createdAt');
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// @desc    Get recent items
// @route   GET /api/items/recent
// @access  Public
const getRecentItems = asyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    
    // Find available items, sorted by creation date (newest first)
    const items = await Item.find({ status: 'available' })
      .sort('-createdAt')
      .limit(limit);
    
    // Log the items to verify their structure
    console.log(`Found ${items.length} recent items`);
    
    // Return the items in a consistent format
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    console.error('Error fetching recent items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent items',
      error: error.message
    });
  }
});

// @desc    Search items
// @route   GET /api/items/search
// @access  Public
const searchItems = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search term'
    });
  }

  console.log(`Searching for items with query: ${q}`);
  const items = await Item.searchItems(q);
  console.log(`Found ${items.length} items matching the search term`);
  
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

// @desc    Create new item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    if (!req.file) {
      console.log('No file received in request');
      return res.status(400).json({
        success: false,
        message: 'Please provide an image'
      });
    }

    if (!req.body.addedBy) {
      console.log('No addedBy field in request');
      return res.status(400).json({
        success: false,
        message: 'Please specify who added the item'
      });
    }

    // Upload image to Cloudinary
    try {
      console.log('Attempting to upload to Cloudinary...');
      console.log('File path:', req.file.path);
      console.log('File mimetype:', req.file.mimetype);
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'lost_and_found',
        use_filename: true,
        unique_filename: true,
        resource_type: 'auto'
      });
      
      console.log('Cloudinary upload successful:', result);

      // Create item with Cloudinary image data
      const itemData = {
        ...req.body,
        image: {
          url: result.secure_url,
          public_id: result.public_id
        }
      };

      // Clean up the uploaded file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temporary file:', err);
      });

      const item = await Item.create(itemData);
      console.log('Item created successfully:', item);

      res.status(201).json({
        success: true,
        data: item
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary upload error:', cloudinaryError);
      // Clean up the uploaded file even if Cloudinary upload fails
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting temporary file:', err);
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Error uploading image to Cloudinary',
        error: cloudinaryError.message
      });
    }
  } catch (error) {
    console.error('Error creating item:', error);
    // Clean up the uploaded file if it exists
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temporary file:', err);
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating item',
      error: error.stack
    });
  }
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  // If new image is provided, upload to Cloudinary and delete old image
  if (req.body.image && req.body.image !== item.image.url) {
    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(item.image.public_id);

    // Upload new image
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'lost_and_found',
      use_filename: true,
      unique_filename: true
    });

    req.body.image = {
      url: result.secure_url,
      public_id: result.public_id
    };
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: item
  });
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private (Admin/Guard)
const deleteItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    // Delete image from Cloudinary if it exists and has the new structure
    if (item.image && typeof item.image === 'object' && item.image.public_id) {
      try {
        await cloudinary.uploader.destroy(item.image.public_id);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
        // Continue with item deletion even if Cloudinary deletion fails
      }
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Error in deleteItem:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Claim item
// @route   PUT /api/items/:id/claim
// @access  Public
const claimItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  if (item.status !== 'available') {
    return res.status(400).json({
      success: false,
      message: 'Item is not available for claiming'
    });
  }

  item.status = 'claimed';
  item.claimedBy = {
    studentName: req.body.studentName,
    rollNumber: req.body.studentId,
    studyYear: req.body.studentYear,
    contactNumber: req.body.contactNumber,
    claimedDate: new Date()
  };

  await item.save();

  res.status(200).json({
    success: true,
    data: item
  });
});

// @desc    Deliver item
// @route   PUT /api/items/:id/deliver
// @access  Private
const deliverItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  if (item.status !== 'claimed') {
    return res.status(400).json({
      success: false,
      message: 'Item must be claimed before delivery'
    });
  }

  item.status = 'delivered';
  item.deliveredTo = {
    ...req.body,
    deliveryDate: Date.now()
  };

  await item.save();

  res.status(200).json({
    success: true,
    data: item
  });
});

module.exports = {
  getItems,
  getRecentItems,
  searchItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  claimItem,
  deliverItem,
  markAsDelivered: deliverItem
};