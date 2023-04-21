import React,{useContext, useEffect, useRef} from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


export const Message = (message) => {
  const {data}=useContext(ChatContext);
  const {currentUser}=useContext(AuthContext);
  const ref=useRef();

  useEffect(()=>{
      ref.current?.scrollIntoView({behavior:"smooth"});
  },[message])

  return (
    <div ref={ref} className={message.message.senderId===currentUser.uid?"msg owner":"msg"}>
      <div className="msginfo">
        <img src={message.message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt="" />
        <span>{}</span>
      </div>
      <div className="msgtext">
        {message.message.text&&<p>{message.message.text}</p>}
        <img src={message.message.img} alt="" />
      </div>
    </div>
  )
}
