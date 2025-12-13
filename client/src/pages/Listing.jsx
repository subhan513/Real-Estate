import React, { useEffect} from 'react'
import { useState } from 'react';
import {useParams} from "react-router-dom"
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle";

const Listing = () => {

  SwiperCore.use(Navigation)
  const params = useParams();
  const [listing, setlisting] = useState(null)
  const [loading, setloading] = useState(false)
useEffect(()=>{
  const fetchListing = async () => {
    setloading(true)
    const response = await fetch(`/api/listing/get/${params.id}`)
    const data = await response.json();
   if(data.message === false){
    console.log(data.message);
    return;
   }
   setlisting(data)
   setloading(false)
  }
  fetchListing();
},[params.id])
  return (
    <div>
      {loading && <p>Loading......</p>}
      { listing && !loading &&(
       <Swiper navigation>
    {listing.imageUrls.map((url)=>{
      return <SwiperSlide key={url}>
        <div className ='h-[500px]' style={{background : `url(${url}) center no-repeat`, 
        backgroundSize: 'cover',
          }}>

        </div>
      </SwiperSlide>
    })}
       </Swiper>   
      )}
    </div>
  )
}

export default Listing