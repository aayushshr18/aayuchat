import React,{useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid} from 'uuid';
import {  arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db,storage } from '../Firebase';

export const Input = () => {
  
  const [text,setText]=useState("");
  const [img,setImg]=useState(null);
  const {data}=useContext(ChatContext);
  const {currentUser}=useContext(AuthContext);
  
  const handleSend=async()=>{
      if(img){
        const storageRef = ref(storage, uuid());
        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db,"chats",data.chatId),{
                messages:arrayUnion({
                  id:uuid(),
                  text,
                  img:downloadURL,
                  senderId:currentUser.uid,
                  date:Date.now()
                })
              })
            } catch (err) {
              console.log(err);
            }
          })});

      }else if(text){
        await updateDoc(doc(db,"chats",data.chatId),{
          messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.uid,
            date:Date.now()
          })
        })
      }
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId+".lastMessage"]:{
          text
        },
        [data.chatId+".date"]:serverTimestamp()
      })
      await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId+".lastMessage"]:{
          text
        },
        [data.chatId+".date"]:serverTimestamp()
      })

      setImg(null);
      setText("");
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
      <div className="input">
      <input type="text" placeholder='Say "Hello"'  value={text} onKeyDown={handleKey} onChange={e=>setText(e.target.value)} />
      <div className="send">
        <img src="/img/attach.jpg" style={{opacity:".8"}} alt="" />
        <label htmlFor="file"><img src="/img/add.png" alt="" /></label>
        <input type="file" id='file' style={{display:"none"}} onChange={e=>{setImg(e.target.files[0])
       }} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
