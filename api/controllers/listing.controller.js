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