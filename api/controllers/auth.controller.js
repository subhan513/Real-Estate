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
  result: rest,  // rest को किसी key के अंदर रखें
  success: true
});
   } catch (error) {
    res.status(500).json({Message : "Failed to logged in user", success : false})
   }
}