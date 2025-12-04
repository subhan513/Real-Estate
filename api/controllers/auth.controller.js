import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
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