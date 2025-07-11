const { body } = require("express-validator");

const updateUserValidation = [
    body('email')
      .optional()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('category')
      .optional()
      .isIn(['professional', 'student', 'freelancer', 'business'])
      .withMessage('Category must be one of: professional, student, freelancer, business'),
    body('mobile')
      .optional()
      .matches(/^[0-9]{10,15}$/)
      .withMessage('Mobile number must be 10-15 digits'),
    body('country_code')
      .optional()
      .matches(/^\+[1-9]\d{0,3}$/)
      .withMessage('Country code must be in format +1 to +9999'),
    body('isVerified')
      .optional()
      .isBoolean()
      .withMessage('isVerified must be a boolean'),
    body('havePreference')
      .optional()
      .isBoolean()
      .withMessage('havePreference must be a boolean'),
    body('planPurchased')
      .optional()
      .isBoolean()
      .withMessage('planPurchased must be a boolean'),
    body('portfolioLink')
      .optional()
      .isURL()
      .withMessage('Portfolio link must be a valid URL'),
    body('profilePic.url')
      .optional()
      .isURL()
      .withMessage('Profile picture URL must be valid'),
    body('profilePic.public_id')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('Profile picture public_id cannot be empty'),
    body('resume.url')
      .optional()
      .isURL()
      .withMessage('Resume URL must be valid'),
    body('resume.public_id')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('Resume public_id cannot be empty')
  ];


module.exports=updateUserValidation;