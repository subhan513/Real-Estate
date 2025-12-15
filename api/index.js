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

app.use(
  cors({
    origin : "https://real-estate-cqub.vercel.app",
    methods : ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders : ["Content-Type","Authorization"],
    Credentials : true,
  })
)

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json({ limit: '5mb' }));

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', ListingRouter);

// Health check endpoint for Vercel
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});
export default app;