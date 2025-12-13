import Listing from "../models/listing.model.js"
import cloudinary from "../lib/cloudinary.js";

export const CreateListing = async (req, res, next) => {
  try {
    const {name, description, address, type, bedrooms, bathrooms, regularPrice, discountPrice, offer, parking, furnished, imageFiles, userRef} = req.body;
    if (!imageFiles || !Array.isArray(imageFiles) || imageFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required"
      });
    }

    const UploadPromise = imageFiles.map(async (image)=>{
      try {
        const result = await cloudinary.uploader.upload(image, {
          folder: "real_estate_listings",
          resource_type: "image"
        });
        return {
          url: result.secure_url
        }
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Image Upload failed: " + error.message);
      }
    })

    const uploadedImages = await Promise.all(UploadPromise);

    const finalDiscountPrice = discountPrice || 0;

    const listing = await Listing.create({
      name,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      regularPrice,
      discountPrice: finalDiscountPrice, 
      offer,
      parking,
      furnished,
      userRef,
      imageUrls: uploadedImages.map((img)=>{
        return img.url
      })
    });
    
    return res.status(201).json(listing);
    
  } catch (error) {
    console.error("CreateListing error:", error);
    next(error);
    return res.status(500).json({message  : "Failed to  create te listing", success : false})
  }
}


export const deleteListing = async(req,res)=>{
  const listing = await Listing.findById(req.params.id);
  if(!listing){
    return res.status(400).json({message : "Listing Not Found", success : false})
  }
  if (req.user.id !== listing.userRef.toString()) {
    return res.status(401).json({message : "you  can only delete your own listings",success : false})
  }
 try {
  await Listing.findByIdAndDelete(req.params.id)
  res.status(201).json({message : "Listing has been deleted successfully"})
 } catch (error) {
  res.status(500).json({message : "Internal Server Error", success : false})
 } 
}


export const updateListing = async (req,res) =>{
   const listing = await Listing.findById(req.params.id);
  if(!listing){
    return res.status(400).json({message : "Listing Not Found", success : false})
  }
  if (req.user.id !== listing.userRef.toString()) {
    return res.status(401).json({message : "you  can only dedit your own listings",success : false})
  }
  try {
    await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    )
     res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({message : "Failed to delete the listing"})
  }

}


export const getListing = async (req,res) =>{
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
      return  res.status(404).json({message : "Listing not found"})
    }
    res.status(200).json(listing)
  } catch (error) {
   res.status(500).json({message : "Internal Server error"}) 
  }
}


export const getListings = async (req,res) =>{
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query,startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = {$in : [false,true]};
    }
    let furnished = req.query.furnished;
    if(furnished === undefined || furnished === 'false'){
      furnished = { $in  : [false,true]}
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }
        let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }
const searchTerm = req.query.searchTerm || '';
const sort = req.query.sort || 'createdAt';
const order = req.query.order || 'desc';

const listings = await Listing.find({
  name : {
    $regex : searchTerm, $options : 'i'
  },
  offer,
  parking,
  furnished,
  type,
}).sort({[sort] : order})
.limit(limit)
.skip(startIndex)

return res.status(200).json(listings)
  } catch (error) {
    console.log(error);
  }
}