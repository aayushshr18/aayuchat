import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">AayuChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" className="userimg" />
        <span className="username">{currentUser.displayName}</span>
        <button className="logout" onClick={()=>{signOut(auth)}} >LogOut</button>
      </div>
    </div>
  )
}
