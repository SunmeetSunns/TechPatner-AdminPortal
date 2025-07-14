const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');

const users = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    password: "abc12300",
    unhashedPassword: "john123",
    isVerified: true,
    category: "Professional",
    plan:"Basic",
    mobile: "9876543210",
    country_code: "+91",
    havePreference: true,
    planPurchased: true,
    portfolioLink: "https://johnsportfolio.dev",
    profilePic: {
      url: "",
      public_id: ""
    },
    resume: {
      url: "",
      public_id: ""
    }
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "$2b$10$abcxyz456",
    unhashedPassword: "jane123",
    isVerified: false,
    category: "Student",
    plan:"Explorer",
    mobile: "9988776655",
    country_code: "+1",
    havePreference: false,
    planPurchased: false,
    portfolioLink: "",
    profilePic: {
      url: "",
      public_id: ""
    },
    resume: {
      url: "",
      public_id: ""
    }
  },
  {
    email: "ali.khan@example.com",
    name: "Ali Khan",
    password: "$2b$10$abcxyz789",
    unhashedPassword: "ali123",
    isVerified: true,
    category: "Agency",
    mobile: "9123456780",
    country_code: "+92",
    havePreference: true,
    planPurchased: true,
    portfolioLink: "",
    profilePic: {
      url: "",
      public_id: ""
    },
    resume: {
      url: "",
      public_id: ""
    }
  },
  {
    email: "emma.watson@example.com",
    name: "Emma Watson",
    password: "$2b$10$abcxyz000",
    unhashedPassword: "emma123",
    isVerified: false,
    category: "Professional",
    plan:"Plus",
    mobile: "9553311220",
    country_code: "+44",
    havePreference: false,
    planPurchased: false,
    portfolioLink: "",
    profilePic: {
      url: "",
      public_id: ""
    },
    resume: {
      url: "",
      public_id: ""
    }
  },
  {
    email: "raj.verma@example.com",
    name: "Raj Verma",
    password: "$2b$10$abcxyz555",
    unhashedPassword: "raj123",
    isVerified: true,
    category: "Student",
    plan:"Growth",
    mobile: "8899776655",
    country_code: "+91",
    havePreference: true,
    planPurchased: true,
    portfolioLink: "",
    profilePic: {
      url: "",
      public_id: ""
    },
    resume: {
      url: "",
      public_id: ""
    }
  }
];


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // await User.deleteMany({});
    await User.insertMany(users);
    console.log('Dummy users inserted!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
