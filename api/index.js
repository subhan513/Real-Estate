import express from "express";
import mongoose  from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"
import ListingRouter from "./routes/listing.route.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

// Connect to MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
  if (process.env.MONGO) {
    try {
      await mongoose.connect(process.env.MONGO, {
        serverSelectionTimeoutMS: 5000,
      });
      isConnected = true;
      console.log("Connected to the Database");
    } catch (err) {
      console.log("Failed connect with Database", err);
      isConnected = false;
    }
  }
};

// Initialize connection for serverless
if (process.env.VERCEL) {
  connectDB();
}

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/listing',ListingRouter)

// Health check endpoint
app.get('/api/health', async (req, res) => {
  await connectDB();
  res.json({ status: 'ok' });
});

// Middleware to ensure DB connection for all routes
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export Express app for Vercel
// Vercel will automatically handle the Express app
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}