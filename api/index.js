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
if (process.env.MONGO) {
  mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to the Database");
  }).catch((err)=>{
    console.log("Failed connect with Database",err);
  })
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
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export for Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}