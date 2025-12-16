import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { signInStart, signInSuccess, signInFailure,deleteFailure,deleteStart,deleteSuccess,SignoutFailure,SignoutSuccess, SignoutStart
} from "../redux/user/userSlice.js";
import { useRef, useState } from "react";

const Profile = () => {
  const VITE_API_URL = "https://real-estate-eight-snowy.vercel.app";
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  
  const [showError, setshowError] = useState(null);
  const [UserListings, setUserListings] = useState([]);
  const [showUplaodListings, setshowUplaodListings] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  // Check if user is logged in
  if (!currentUser) {
    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-4">Profile</h1>
        <p className="text-red-600 text-center">Please login to view profile</p>
        <Link to="/sign-in" className="block text-center text-blue-600 mt-4">
          Go to Login
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64Image = reader.result;
        setImageFile(base64Image);
        setFormData(prev => ({ ...prev, imagefile: base64Image }));
      };

      reader.onerror = () => {
        setError("Failed to read image file");
      };
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); 
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const id = currentUser?._id;
      
      if (!id) {
        throw new Error("User ID not found");
      }
      
      const updateData = { ...formData };
      if (!updateData.password.trim()) {
        delete updateData.password;
      }

      const ProfileApiResponse = await fetch(`${VITE_API_URL}/api/user/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData)
      });

      const response = await ProfileApiResponse.json();

      if (!ProfileApiResponse.ok) {
        throw new Error(response.message || "Update failed");
      }

      if (response.success) {
        dispatch(signInSuccess(response.result));
        setSuccess(true);
        setFormData(prev => ({ ...prev, password: '' }));
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      console.error("Update error:", error);
      setError(error.message);
      dispatch(signInFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    
    try {
      dispatch(deleteStart());
      
      const DeleteUserApiResponse = await fetch(`${VITE_API_URL}/api/user/delete/${currentUser?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      
      const data = await DeleteUserApiResponse.json();
      
      if (data.success) {
        dispatch(deleteSuccess(data.message));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      } else {
        dispatch(deleteFailure(data.message));
        setError(data.message || "Failed to delete account");
      }
      
    } catch (error) {
      dispatch(deleteFailure(error.message));
      setError(error.message);
    }
  };

  const handleSignOutClick = async () => {
    try {
      dispatch(SignoutStart());
      
      const Response = await fetch(`${VITE_API_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include"
      });
      
      const data = await Response.json();
      
      if (data.success === false) {
        dispatch(SignoutFailure(data.message));
        return;
      }
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(SignoutSuccess());
      window.location.href = '/';
      
    } catch (error) {
      dispatch(SignoutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setshowUplaodListings(true);
      setshowError(null);
      
      if (!currentUser?._id) {
        setshowError("User not found. Please login again.");
        return;
      }
      
      const response = await fetch(`${VITE_API_URL}/api/user/listings/${currentUser._id}`, {
        credentials: "include"
      });
      
      const data = await response.json();
      
      if (data.success === false) {
        setshowError(data.message);
        return;
      }
      
      setUserListings(data);
      
    } catch (error) {
      setshowError(error.message);
    } finally {
      setshowUplaodListings(false);
    }
  };

  const handleDeleteListing = async (listingID) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }
    
    try {
      const response = await fetch(`${VITE_API_URL}/api/listing/delete/${listingID}`, {
        method: "DELETE",
        credentials: "include"
      });
      
      const data = await response.json();
      
      if (data.success === false) {
        console.error("Delete listing failed:", data.message);
        setError(data.message);
        return;
      }
      
      setUserListings(prev => 
        prev.filter((listing) => listing._id !== listingID)
      );
      
    } catch (error) {
      console.error("Delete listing error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-4">Profile</h1>
    
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profile updated successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form className="flex flex-col my-7" onSubmit={handleUpdateProfile}>
        <input 
          onChange={handleImageUpload} 
          type="file" 
          ref={fileRef} 
          className="hidden" 
          accept="image/*"
        />

        <div className="relative self-center mb-4">
          <img 
            onClick={() => fileRef.current.click()} 
            src={imageFile || currentUser.avatar} 
            className="h-24 w-24 rounded-full cursor-pointer border-2 border-gray-300 hover:border-gray-500"
            alt="Profile" 
          />
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 text-xs cursor-pointer">
            Edit
          </div>
        </div>
        <input 
          type="text" 
          id="username" 
          placeholder="Username" 
          value={formData.username}
          className='p-3 border rounded my-2' 
          onChange={handleChange}
          required
        />

        <input 
          type="email" 
          id="email" 
          placeholder="Email" 
          value={formData.email}
          className='p-3 border rounded my-2' 
          onChange={handleChange}
          required
        />
        <input 
          type="password" 
          id="password" 
          placeholder="New Password (leave empty to keep current)" 
          value={formData.password}
          className='p-3 border rounded my-2' 
          onChange={handleChange}
        />
        <button 
          type="submit" 
          className="bg-gray-900 text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
         <button type="button">
          <Link className="bg-green-700 p-3 flex items-center justify-center my-1 text-white rounded-lg font-semibold text-xl" to={'/create-listing'}>Create Listing</Link>
          </button>
      </form>
      <div className="flex justify-between font-normal mt-6 pt-6 border-t">
        <button 
          className="text-red-600 hover:text-red-800 font-bold cursor-pointer" 
          onClick={handleDeleteUser}
        >
          Delete Account
        </button>
        <button 
          className="text-blue-600 hover:text-blue-800 cursor-pointer" 
          onClick={handleSignOutClick}
        >
          Sign Out
        </button>
      </div>
     <div className="flex items-center justify-center">
      <button 
        className="bg-blue-700 text-white text-lg rounded w-fit p-3 hover:bg-green-700 cursor-pointer" 
        onClick={handleShowListings}
        disabled={showUplaodListings}
      >
        {showUplaodListings ? "Loading..." : "Show Listings"}
      </button>
     </div>
     <p className='text-red-700 mt-5'>
        {showError ? 'Error showing listings' : ''}
      </p>
    {UserListings && UserListings.length > 0 && (
      <div className="mt-6">
        <h1 className="text-red-800 text-xl font-semibold mb-4">Your Listings</h1>
        {UserListings.map((listing) => (
          <div
            key={listing._id}
            className="flex justify-between items-center gap-4 mb-4 p-3 border rounded"
          >
            <Link to={`/listing/${listing._id}`} className="flex items-center gap-3 flex-1">
              <img 
                src={listing.imageUrls?.[0] || '/default-listing.jpg'} 
                alt="listing Cover"  
                className="h-16 w-16 object-cover rounded"
              />
              <span className="line-clamp-2 text-sm">{listing.name || 'Untitled Listing'}</span>
            </Link>
            <div className="flex flex-col gap-2">
              <Link to={`/update-listing/${listing._id}`}>
                <button className="text-green-700 font-bold text-sm px-2 py-1 border border-green-700 rounded hover:bg-green-50">
                  EDIT
                </button>
              </Link>
              <button 
                className="text-red-700 font-bold text-sm px-2 py-1 border border-red-700 rounded hover:bg-red-50"
                onClick={() => handleDeleteListing(listing._id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
}

export default Profile;