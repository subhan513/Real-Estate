import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import ListingRouter from "./routes/listing.route.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// ✅ Fixed: Async DB connection for Vercel serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Don't exit process in serverless
    throw error;
  }
};

// ✅ CORS configuration - Fixed typo
app.use(
  cors({
    origin: "https://real-estate-cqub.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // lowercase
  })
);

// ✅ Cookie parser
app.use(cookieParser());

// ✅ Body parser
app.use(express.json({ limit: '5mb' }));

// ✅ Health check endpoint (without DB connection)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Real Estate API',
    status: 'running'
  });
});

// ✅ Middleware to ensure DB connection before API routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ✅ API Routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/listing', ListingRouter);

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : message,
  });
});

// ✅ Export for Vercel serverless
export default app;