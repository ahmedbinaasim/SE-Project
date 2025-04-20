// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const connectDB = require('./src/config/db');
// // const authRoutes = require('./src/routes/authRoutes');

// // // Load environment variables
// // dotenv.config();

// // // Connect to MongoDB
// // connectDB();

// // // Initialize express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Routes
// // app.use('/api/auth', authRoutes);

// // // Health check route
// // app.get('/health', (req, res) => {
// //   res.status(200).json({ status: 'OK', message: 'Server is running' });
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     status: 'error',
// //     message: err.message || 'Something went wrong!'
// //   });
// // });

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).json({
// //     status: 'fail',
// //     message: `Can't find ${req.originalUrl} on this server!`
// //   });
// // });

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./src/config/db');
// const authRoutes = require('./src/routes/authRoutes');
// const userRoutes = require('./src/routes/userRoutes');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// // Health check route
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 'error',
//     message: err.message || 'Something went wrong!'
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     status: 'fail',
//     message: `Can't find ${req.originalUrl} on this server!`
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const ocrRoutes = require('./src/routes/ocrRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const folderRoutes = require('./src/routes/folderRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/folders', folderRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});