import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const signup = async (req,res) => {
  const {username, email, password} = req.body;
  const user = User.findOne({email})
  if(user){
    res.status(400).json({message : "User already exists", success : false})
  }
  const hashedPassword = bcrypt.hashSync(password,10)
  const newUser = new User({username, email, password : hashedPassword})
  try {
    await newUser.save();
    res.status(200).json({message : "User  Created Successfully", success : true})
  } catch (error) {
    res.status(400).json({message  : "Failed to create the User", success : false})
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
     return  res.status(500).json({message : "Failed to login the user", success : false})  
    }
    const token = jwt.sign({id :user._id},process.env.JWT_SECRET)
     const {password:pass,...rest} = user._doc;
    res.cookie("access_token",token,{httpOnly : true})
   res.status(200).json({
  result: rest, 
  success: true
});
   } catch (error) {
    res.status(500).json({Message : "Failed to logged in user", success : false})
   }
}


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const userObj = user._doc || user;
      const { password: pass, ...rest } = userObj;
      
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
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
      
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};