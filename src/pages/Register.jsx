import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage,db } from "../Firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';




export const Register = () => {
    
  const [load,setLoad]=useState(false);
    const [err, setErr] = useState(false);
    const navigate= useNavigate();

    const handleSubmit = async (e) => {
        setLoad(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
      
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
      
            await uploadBytesResumable(storageRef, file).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });
                  //create user chats
                  await setDoc(doc(db, "userChats", res.user.uid), {});
                  navigate("/");
      
                } catch (err) {
                  console.log(err);
                  setErr(true);
                }
              });
            });
          } catch (err) {
            setErr(true);
          }
        };



    return (
        <div className="formcontainer">
            <div className="formwrapper">
                <span className="logo">AayuChat</span>
                <span className="title">Register</span>
                <form action="" onSubmit={handleSubmit}>
                    <input  type="text" placeholder='Your Name here' />
                    <input  type="email" placeholder='someone@email.com' />
                    <input  type="password" placeholder='passwordXX' />
                    <input  type="file" id='file' style={{ display: "none" }} placeholder='' />
                    <label htmlFor="file"><img className='imglbl' src="/img/add.png" alt="" /> Add an Avatar</label>
                    <button>{load?"Loading...":"Sign Up"}</button>
                    {err && <span>Invalid Email or Password too Short</span>}
                </form>
                
                <span className='signin'>Already have an account?<Link to={"/login"}> <u><b>Log In</b></u></Link> </span>
            </div>
        </div>
    )
}
