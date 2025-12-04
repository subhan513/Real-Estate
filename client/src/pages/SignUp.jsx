import React from 'react';
import {Link} from "react-router-dom"
import { useState } from 'react';
const SignUp = () => {
  const [formData, setformData] = useState({})
  const handleChange = (e) =>{
    setformData({...formData, [e.target.id] : e.target.value})
    console.log(formData)
  }
 // SignUp.jsx में आपका handleSubmit function कुछ ऐसा होगा:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json(); 
    console.log(data);
    
  } catch (error) {
    console.error('Error:', error);
  }
};
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col md:w-xl item-center justify-center mx-auto container p-3 gap-3' onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter the username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='Enter your Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Enter your Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className='bg-gray-700 text-white p-3 rounded-xl hover:bg-green-400'>SIGN UP</button>
      </form>
      <div className="flex items-center justify-center">
        <p>Already have an account ? <Link to={'/sign-in'}>Sign in </Link></p>
      </div>
    </div>
  )
}

export default SignUp