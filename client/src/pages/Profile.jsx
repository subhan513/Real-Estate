import {useSelector} from "react-redux"
import {useRef} from "react"
const Profile = () => {
  const {currentUser}  = useSelector((state)=>state.user)
  const fileRef = useRef();
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold">Profile</h1>
    <form className="flex flex-col my-7">
      <input type="file" ref={fileRef} className="hidden"/>
      <img  onClick={()=>fileRef.current.click()}   src={currentUser.avatar} className="h-24 w-24 rounded-full self-center" alt="" />
      <input type="text" id="username" placeholder="username" className='p-3 border rounded my-2' />
      <input type="email" id="email" placeholder="email" className='p-3 border rounded my-2' />
      <input type="password" id="password" placeholder="password" className='p-3 border rounded my-2' />
      <button className="bg-gray-900 text-white p-3 rounded">Update</button>
    </form>
    <div className="flex justify-between font-normal">
      <span className="text-red-900 font-bold text-xl">Delete Account</span>
      <span>Sign Out</span>
    </div>
    </div>
  )
}

export default Profile