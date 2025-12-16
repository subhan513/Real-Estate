import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const signup = async (req,res) => {
  const {username, email, password} = req.body;
  const user =await User.findOne({email})
  if(user){
    res.status(400).json({message : "User already exists", success : false})
  }
  const hashedPassword = bcrypt.hashSync(password,10)
  const newUser = new User({username, email, password : hashedPassword})
  try {
    await newUser.save();
     return res.status(200).json({message : "User  Created Successfully", success : true})
  } catch (error) {
    return res.status(400).json({message  : "Failed to create the User", success : false})
  }
}

export const signin = async (req,res) => {
  try {
   const {email,password} = req.body;
   const user = await User.findOne({email : email})
   
   if(!user){
       return res.status(400).json({message : "User not Found" , success : false})
   }
   
   const VerifyPassword = bcrypt.compareSync(password,user.password)
   if(!VerifyPassword){
    return  res.status(400).json({message : "Invalid credentials", success : false})  
   }
   
   const token = jwt.sign({id :user._id},process.env.JWT_SECRET)
   const {password:pass,...rest} = user._doc;
   
   // ✅ FIXED COOKIE SETTINGS FOR PRODUCTION
   const isProduction = process.env.NODE_ENV === 'production';
   
   res.cookie("access_token",token,{
     httpOnly : true,
     secure: isProduction,
     sameSite: isProduction ? 'none' : 'lax',
     maxAge: 30 * 24 * 60 * 60 * 1000,
     path: '/'
   });
   
   // ✅ Return success response with user data
   res.status(200).json({
     success: true,
     user: rest,
     token: token
   });
   
  } catch (error) {
   console.error('Signin error:', error);
   res.status(500).json({
     success: false,
     message: "Failed to login"
   });
  }
}


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    // ✅ Determine if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
      const userObj = user._doc || user;
      const { password: pass, ...rest } = userObj;
      
      // ✅ FIXED COOKIE SETTINGS FOR PRODUCTION
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: isProduction, // true for HTTPS (production)
        sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/'
      });
      
      res.status(200).json({
        success: true,
        user: rest,
        token: token // Also send token in response
      });
      
    } else {
      const generatePassword = 
        Math.random().toString(36).slice(-8) + 
        Math.random().toString(36).slice(-8);
      
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      
      const baseUsername = req.body.name.split(" ").join("").toLowerCase();
      const randomSuffix = Math.random().toString(36).slice(-4);
      const username = baseUsername + randomSuffix;
      
      const newUser = new User({
        username: username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      
      await newUser.save();
      
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      
      const newUserObj = newUser._doc || newUser;
      const { password: pass, ...rest } = newUserObj;
      
      // ✅ FIXED COOKIE SETTINGS FOR PRODUCTION
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: isProduction, // true for HTTPS (production)
        sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/'
      });
      
      res.status(200).json({
        success: true,
        user: rest,
        token: token // Also send token in response
      });
    }
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed'
    });
  }
};