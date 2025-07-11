export const createValidationRules = () => ({
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters long'
      }
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email address'
      }
    },
    mobile: {
      required: 'Mobile number is required',
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Please enter a valid 10-digit mobile number'
      }
    },
    country_code: {
      required: 'Country code is required'
    },
    category: {
      required: 'Category is required'
    },
    portfolioLink: {
      pattern: {
        value: /^https?:\/\/.+/,
        message: 'Please enter a valid URL starting with http:// or https://'
      }
    }
  });