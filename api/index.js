import express from "express";
import mongoose  from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"
import ListingRouter from "./routes/listing.route.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
  console.log("Connected to the Database");
  
}).catch((err)=>{
  console.log("Failed connnect with Database",err);
})
const _dirname = path.resolve();

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/listing',ListingRouter)

app.use(express.static(path.join(_dirname,'client/dist')));
app.get('*',(req,res)=>{
   res.sendFile(path.join(_dirname,'client/dist','index.html'));
});
app.listen(3000,()=>{
  console.log("Server is listening on the port 3000");
})