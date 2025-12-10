import React from 'react'
import { useState } from 'react'

const CreateListing = () => {
const [FormData, setFormData] = useState({});
const [erros, seterros] = useState(null)
const [imagePreviews, setImagePreviews] = useState([])

const handleDeleteImage = (indexid) =>{
  const confirmed = window.confirm("Are you sure you want to delete this image?");
  
  if (!confirmed) {
    return; 
  }
  
  const filteredImage = imagePreviews.filter((item,index)=>{
      return index!== indexid
  })
  setImagePreviews(filteredImage);
  
  // Also update FormData
  setFormData(prev => ({
    ...prev,
    imageFiles: prev.imageFiles.filter((_, index) => index !== indexid)
  }));
}

const handleImageChange = (e) =>{
  const imagefiles = e.target.files;
  
  if (!imagefiles || imagefiles.length === 0) {
    seterros("Please select at least one image");
    return;
  }
  
  seterros(null);
  
  const filesArray = Array.from(imagefiles);
  const allBase64Images = [];
  

  filesArray.forEach((file, index) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64Image = reader.result;
      allBase64Images.push(base64Image);
      

      if (allBase64Images.length === filesArray.length) {
        setImagePreviews(prev => [...prev, ...allBase64Images]);
        setFormData(prev=>({
          ...prev, 
          imageFiles: [...(prev.imageFiles || []), ...allBase64Images]
        }));
        e.target.value = '';
      }
    };
    
    reader.onerror = () => {
      seterros("Failed to read image file");
    };
    
    reader.readAsDataURL(file);
  });
}

  return (
   <main className='max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form className='flex flex-col sm:flex-row'>
       <div className='flex flex-col gap-3 p-2 flex-1'>
        <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
        <textarea type="text" placeholder='description' className='border p-3 rounded-lg' id='Description' required />
        <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='62' minLength='10' required />
        <div className='flex gap-2 flex-wrap'>
          <div className='flex gap-2'>
            <input type="checkbox" id='sale' className='w-5'/>
            <span className='font-semibold'>Sell</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='rent' className='w-5'/>
            <span className='font-semibold'>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='parking' className='w-5'/>
            <span className='font-semibold'>Parking Spot</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='furnished' className='w-5'/>
            <span className='font-semibold'>Furnished</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='offer' className='w-5'/>
            <span className='font-semibold'>Offer</span>
          </div>
        </div>
        <div className='flex items-center flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input type="number"  id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
            <p>Beds</p>
          </div>
          <div className='flex items-center gap-2'>
            <input type="number"  id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
            <p>Baths</p>
          </div>
          <div className='flex items-center gap-2'>
            <input type="number"  id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
            <div>
            <p className='font-bold'>Regular Price</p>
            <span className='text-xs'>($ / month)</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <input type="number"  id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
            <div>
            <p className='font-bold '>Discounted Price</p>
             <span className='text-xs'>($ / month)</span>
            </div>
          </div>
        </div>
       </div>
      <div className='flex flex-col flex-1'>
    <p className='font-semibold mb-3 ml-1'>
    Images:
    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover</span>
  </p>
  
  <div className='flex gap-2 p-1'>
    <input 
    onChange={handleImageChange}
      type="file" 
      id='images' 
      accept='image/*'  
      multiple  
      className=' ml-1 py-3 px-1 border w-[350px] border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition'
    />
  </div>
  {imagePreviews.length > 0 && (
    <div className="ml-1 mt-3">
      <p className="text-sm text-gray-600 mb-2">
        Selected images: {imagePreviews.length}
      </p>
      <div className="flex flex-wrap gap-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img 
              src={preview} 
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded border"
            />
            <button  
              type='button' 
              className='bg-red-700 my-1 p-2 rounded text-xl text-white hover:bg-red-800'
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </button>
            {index === 0 && (
              <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-0.5">
                Cover
              </div>
            )}
            <div className="text-xs text-gray-500 text-center mt-1">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
  
  {erros && (
    <p className="text-red-500 text-sm ml-1 mt-2">{erros}</p>
  )}
  
<button className='bg-green-600 p-4 md:p-3 md:w-[350px] m-1 rounded-full font-bold text-white text-xl '>Create Listing</button>
</div>
    </form>
   </main>
  )
}

export default CreateListing;