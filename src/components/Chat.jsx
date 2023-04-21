import React,{useContext} from 'react'
import {Messages} from "./Messages"
import {Input} from "./Input"
import {ChatContext} from "../context/ChatContext";


export const Chat = () => {
  const {data}=useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatinfo">
      <a href="#side" style={{textDecoration:"none"}}>{data.user.displayName!==undefined?<span> &larr;{" "+data.user?.displayName}</span>:<span  >Select a User Chat</span>}</a>
        <div className="chaticons">
          <img src="/img/addu.png" alt="" />
          <img src="/img/cam.jpg" alt="" />
          <img src="/img/more.png" alt=""  />
        </div>
      </div>
      <Messages/>
      {data.user.displayName!==undefined?<Input/>:<div className='noselect' >Nothing to Display</div>}
    </div>
  )
}
