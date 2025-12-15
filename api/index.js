import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import ListingRouter from "./routes/listing.route.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

// Vercel ke liye PORT configuration
const PORT = process.env.PORT || 3000;

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const app = express();

// CORS configuration - FIXED: credentials should be lowercase
app.use(
  cors({
    origin: "https://real-estate-cqub.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // <-- Fixed: lowercase 'c'
  })
);

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json({ limit: '5mb' }));

// API Routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/listing', ListingRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Real Estate API',
    status: 'running',
    docs: '/api-docs' // If you have API docs
  });
});

// Health check endpoint for Vercel
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (add this at the end)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;