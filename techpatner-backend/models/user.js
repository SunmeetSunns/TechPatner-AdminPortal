const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  unhashedPassword: String,
  isVerified: { type: Boolean, default: false },
  category: { 
    type: String, 
    required: true, 
    enum: ['Student', 'Professional', 'Agency'],
    default: 'Professional' 
  },
  plan: {
    type: String,
    default: function() {
      // Set default plan based on category
      const defaultPlans = {
        'Student': 'starter',
        'Professional': 'basic',
        'Agency': 'solo'
      };
      return defaultPlans[this.category] || 'basic';
    }
  },
  mobile: { type: String, required: true, unique: true },
  country_code: { type: String, required: true },
  havePreference: {
    type: Boolean,
    default: false
  },
  portfolioLink: String,
  profilePic: {
    url: String,
    public_id: String
  },
  resume: {
    url: String,
    public_id: String
  },
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
