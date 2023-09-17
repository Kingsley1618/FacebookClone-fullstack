'use client'
import React,{useState} from 'react'
import {AiOutlineUser} from "react-icons/ai"
import ModalPage from "./Modal"
import {auth, db} from "@/firebase/config"
import {GrGallery} from "react-icons/gr"
import {BsCameraVideoFill} from "react-icons/bs"
import {BsEmojiSmile} from "react-icons/bs"
import Image from "next/image"
import {useAuth} from "@/context/authContext"
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
export default function FeedForm() {
  const {currentUser} = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user] = useDocument(db.collection('users')?.doc(auth?.currentUser?.uid));
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  return (
<>
    <div className="flex flex-col max-w-[600px] mx-auto w-[100%] mt-1 rounded-md bg-white p-2 divide-y-[1.5px]">
    <div className="flex gap-x-2">
    
    {currentUser?.photoURL ? (
          <Image src={currentUser?.photoURL} width={45} height={45} className="w-[45px] h-[45px] cursor-pointer hover:opacity-75 rounded-full object-cover" alt="profilepic" />
        ) : (
          
    <AiOutlineUser className="text-[40px] bg-[rgb(201,204,209)] p-2 rounded-full text-white hover:opacity-60 cursor-pointer"/>)}
    <input type="text"  className="flex-1 rounded-2xl w-[100%] bg-[rgb(240,242,245)] p-2 outline-0" placeholder={`What's on your mind,${currentUser?.displayName}`} />


    </div>
    

    <div className="flex mt-2 items-center flex-wrap">

      <div onClick = {showModal} className="flex-1 flex justify-center items-center gap-x-2 flex-wrap hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2">
        <GrGallery className="text-[22px] text-[rgb(69,189,98)]"/>
        <div className="text-[rgb(124,126,129)] text-[1rem] font-semibold">
            Photo/video(click here)
        </div>
     </div>


      <div className="flex-1 sm:flex hidden justify-center items-center gap-x-2 hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2">
<BsEmojiSmile className="text-[22px] text-[rgb(247,185,40)]"/>

<div className="text-[rgb(124,126,129)] text-[1rem] font-semibold">Feeling/activity</div>


      </div>
    </div>
    
    </div>
    <ModalPage showModal = {showModal} isModalOpen = {isModalOpen} handleCancel = {handleCancel} handleOk={handleOk}/>
    </>
  )
}
