import React from 'react'

const CreateListing = () => {
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
      type="file" 
      id='images' 
      accept='image/*'  
      multiple  
      className='py-3 px-1 border w-[280px] border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition'
    />
    <button 
      type='button'
      className='py-3 px-1 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-600 hover:text-white  mr-1 transition-colors whitespace-nowrap disabled:opacity-80'>
      Upload
    </button>
  </div>
<button className='bg-green-600 p-4 md:p-3 md:w-[300px] m-1 rounded-full font-bold text-white text-xl '>Create Listing</button>
</div>
    </form>
   </main>
  )
}

export default CreateListing;