import React from 'react'
import { Navbar } from "../components/Navbar";
import { Search } from "../components/Search";
import { Chats } from "../components/Chats";

export const Sidebar = () => {
  return (
    <div className="sidebar" id='side'>
      <Navbar />
      <Search />
      <Chats/>
    </div>
  )
}
