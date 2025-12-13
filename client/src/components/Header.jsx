import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate,useLocation } from "react-router-dom";
import {useSelector} from "react-redux"
const Header = () => {
const  {currentUser}  = useSelector((state)=>state.user)
const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();
const location = useLocation();

const handleSubmit = (e) =>{
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('searchTerm',searchTerm)
  const searchQuery = urlParams.toString();
   navigate(`/search?${searchQuery}`)
}


   useEffect(() => {
    const urlParams = new URLSearchParams(location.search); 
    const searchTermFromUrl = urlParams.get('searchTerm');
    
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm('');
    }
    
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-late-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form  onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e)=>setSearchTerm(e.target.value)}
            value={searchTerm}
          />
       <button>
           <FaSearch className="text-slate-600" />
       </button>
        </form>
        <ul className="flex text-slate-800 gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
         { currentUser ? <Link to='/profile'> <img  className='h-7 w-7 rounded-xl' src={currentUser.avatar} alt="profile" /></Link>:
         <Link to={"/sign-up"}>
            <li className=" hover:underline">SignIn</li>
          </Link>}
        </ul>
      </div>
    </header>
  );
};

export default Header;
