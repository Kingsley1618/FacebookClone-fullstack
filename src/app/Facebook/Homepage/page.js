import React from 'react'
import Navbar from "@/components/Facebook/Navbar"
import Post from "@/components/Facebook/Feed/Post"
import FeedForm from "@/components/Facebook/Feed/FeedForm" 

export default function Facebook() {
  return (
   <div className="w-[100%] bg-[rgb(240,242,245)] h-[100%] min-h-[100vh]">
   <Navbar />
<div className="p-4">
   <div className="flex flex-col">
<FeedForm />
<Post />


   </div>
   </div>
   </div>
  )
}
