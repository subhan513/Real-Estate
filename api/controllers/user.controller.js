import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"
import Listing from "../models/listing.model.js";

export const test = (req,res)=>{
  res.json({message : "APi is Working  Fine"})
}


export const UpdateProfile = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ 
      message: "You can update only your own account",
      success: false 
    });
  }
  
  try {
    const updateData = {};

    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 10);
    }
    
    if (req.body.imagefile) {
      const uploadResponse = await cloudinary.uploader.upload(req.body.imagefile);
      updateData.avatar = uploadResponse.secure_url;
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ 
        message: "No data provided for update",
        success: false 
      });
    }
    
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    
    if (!UpdatedUser) {
      return res.status(404).json({ 
        message: "User not found",
        success: false 
      });
    }
    
    const { password: pass, ...rest } = UpdatedUser._doc;
    
    res.status(200).json({
      result: rest,
      success: true,
      message: "User updated successfully"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      message: "Failed to update user",
      success: false 
    });
  }
}


export const DeleteUser = async (req,res) => {
  if (req.user.id !== req.params.id) {
      return res.status(401).json({ 
      message: "You can update only your own account",
      success: false 
    });
  }
  try {
     await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token')
     res.status(200).json({message : "User Deleted Successfully", success : true})
    
  } catch (error) {
    res.status(500).json({message : "Failed to delete  the user", succes : false})
  }
}

export const logout = async (req,res) => {
  try {
     res.clearCookie('access_token').status(200).json({message : "User Logged Out Successfully", success : true})
  } catch (error) { 
    res.status(500).json({message : "Failed to logout the Account", success : false})  
  }
}

export const getUserListings = async (req,res,next) =>{
  if(req.user.id === req.params.id){
    try {
      const listings = await Listing.find({userRef : req.params.id})
      res.status(200).json(listings)
    } catch (error) {
      next(error)
      return res.status(500).json({message : "Failed To ge the All User Listings", success : false})
    }

  }
  else {
    return  res.status(400).json("Failed to get the All User Listings")
  }
}

export const getUser = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if(!user){
      return res.status(404).json({message : "User not found", success : false})
    }
    
    const {password : pass, ...rest} = user._doc;
    res.status(200).json(rest)
    
  } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
  }
}