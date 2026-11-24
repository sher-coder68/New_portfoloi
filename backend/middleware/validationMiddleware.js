import validator from 'validator';

/**
 * Middleware to validate and sanitize contact form submission
 */
export const validateContactInput = (req, res, next) => {
  let { name, email, subject, message } = req.body;
  const errors = {};

  // 1. Sanitize & trim inputs
  name = typeof name === 'string' ? validator.trim(name) : '';
  email = typeof email === 'string' ? validator.trim(email).toLowerCase() : '';
  subject = typeof subject === 'string' ? validator.trim(subject) : '';
  message = typeof message === 'string' ? validator.trim(message) : '';

  // 2. Validate Name
  if (validator.isEmpty(name)) {
    errors.name = 'Name is required';
  } else if (!validator.isLength(name, { min: 2, max: 100 })) {
    errors.name = 'Name must be between 2 and 100 characters';
  }

  // 3. Validate Email
  if (validator.isEmpty(email)) {
    errors.email = 'Email address is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Please provide a valid email address';
  }

  // 4. Validate Subject
  if (validator.isEmpty(subject)) {
    errors.subject = 'Subject is required';
  } else if (!validator.isLength(subject, { min: 3, max: 200 })) {
    errors.subject = 'Subject must be between 3 and 200 characters';
  }

  // 5. Validate Message
  if (validator.isEmpty(message)) {
    errors.message = 'Message content is required';
  } else if (!validator.isLength(message, { min: 10, max: 5000 })) {
    errors.message = 'Message must be between 10 and 5000 characters';
  }

  // Check if errors exist
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the errors and try again.',
      errors,
    });
  }

  // Attach sanitized fields to req.body
  req.body.name = validator.escape(name);
  req.body.email = validator.normalizeEmail(email) || email;
  req.body.subject = validator.escape(subject);
  req.body.message = validator.escape(message);

  next();
};

/**
 * Middleware to validate admin login credentials
 */
export const validateLoginInput = (req, res, next) => {
  let { usernameOrEmail, password } = req.body;
  const errors = {};

  usernameOrEmail = typeof usernameOrEmail === 'string' ? validator.trim(usernameOrEmail) : '';
  password = typeof password === 'string' ? validator.trim(password) : '';

  if (validator.isEmpty(usernameOrEmail)) {
    errors.usernameOrEmail = 'Username or email is required';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials provided',
      errors,
    });
  }

  req.body.usernameOrEmail = usernameOrEmail;
  req.body.password = password;

  next();
};

