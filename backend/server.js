const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Create uploads folder if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/notes', require('./src/routes/notes.routes'));
app.use('/api/users', require('./src/routes/users.routes'));
app.use('/api/ocr', require('./src/routes/ocr.routes'));
app.use('/api/collaboration', require('./src/routes/collaboration.routes'));

// Error handler middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});