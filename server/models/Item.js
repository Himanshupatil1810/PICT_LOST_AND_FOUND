const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an item name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: false,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Study Material',
      'Accessories',
      'ID Cards',
      'Keys',
      'Other'
    ]
  },
  location: {
    type: String,
    required: [true, 'Please select a location'],
    enum: [
      'Main Building',
      'Canteen Area',
      'Library',
      'Computer Lab',
      'Auditorium',
      'Sports Field',
      'Parking Lot',
      'Other'
    ]
  },
  foundDate: {
    type: Date,
    required: [true, 'Please add a found date'],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'delivered'],
    default: 'available'
  },
  image: {
    url: {
      type: String,
      required: [true, 'Please add an image URL']
    },
    public_id: {
      type: String,
      required: [true, 'Please add a public ID']
    }
  },
  addedBy: {
    type: String,
    required: [true, 'Please specify who added the item']
  },
  claimedBy: {
    studentName: {
      type: String,
      required: false
    },
    rollNumber: {
      type: String,
      required: false
    },
    studyYear: {
      type: String,
      required: false
    },
    contactNumber: {
      type: String,
      required: false
    },
    claimedDate: {
      type: Date,
      required: false
    }
  },
  deliveredTo: {
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    studentId: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    deliveryDate: {
      type: Date,
      required: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create text index for search
ItemSchema.index({ name: 'text', description: 'text', category: 'text', location: 'text' });

// Static method to search items
ItemSchema.statics.searchItems = function(query) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('Item', ItemSchema);