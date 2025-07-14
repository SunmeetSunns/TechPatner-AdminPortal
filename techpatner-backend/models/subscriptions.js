const mongoose = require("mongoose");

const fullFormDataSchema = new mongoose.Schema(
  {
    plan: String,
    fullName: String,
    email: String,
    country_code: String,
    phoneNumber: String,
    city: String,
    dob: Date,
    agencyName: String,
    website: String,
    location: String,
    college: String,
    course: String,
    yearOfStudy: String,
    techStack: String,
    portfolioLink: String,
    githubProfile: String,
    linkedinProfile: String,
    yearsOfExperience: String,
    projectDescriptions: String,
    resume: String,
    teamSize: String,
    pocName: String,
    pocEmail: String,
    pocPhoneNumber: String,
    coreServices: String,
    availability: String,
    preferredLearningAreas: String,
    languageComfort: String,
    preferredProjectType: String,
    teamCapacity: String,
    pastClients: String,
    communicationTools: String,
    salesHelpRequired: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    amount: Number,
    noOfProj: Number,
    paymentFrequency: String,
    discount: Number,
  },
  { _id: false }
);

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Adjust if your user model has a different name
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    paymentFrequency: {
      type: String,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    features: {
      type: [String],
      default: [],
    },
    fullFormData: fullFormDataSchema,
    expiryDate: Date,
    paymentStatus: {
      type: String,
      enum: ["Success", "Pending", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    paymentDate: Date,
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
