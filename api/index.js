import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
  console.log("Connected to the Database");
  
}).catch((err)=>{
  console.log("Failed connnect with Database",err);
})
const app = express();

app.listen(3000,()=>{
  console.log("Server is listening on the port 3000");
})