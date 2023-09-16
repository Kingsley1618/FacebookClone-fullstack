'use client'
import React from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {auth, db} from "@/firebase/config"

import Image from "next/image"
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import {AiOutlineUser} from "react-icons/ai"
import {useAuth} from "@/context/authContext"
import Logo from "@/assets/Images/facebooklogo.png"
export default function Navbar() {
 const [user] = useDocument(db.collection('users')?.doc(auth?.currentUser?.uid))
 const {currentUser} = useAuth()
  return (
    <div className="flex justify-between min-h-[9vh] w-[100%] h-[100%] items-center px-3  bg-white shadow-xl">
<div className="flex-1">
<Image src = {Logo} width={40} height = {40} className="" alt="logo"/>
</div>

<div className="flex justify-center flex-1">
<div className=" hover:border-b-4  hover:border-b-[rgb(27,116,228)] cursor-pointer w-[100%] max-w-[200px] flex justify-center"><AiOutlineHome className="text-[35px] text-[rgb(27,116,228)]"/></div>

</div>


<div className="flex justify-end flex-1">

{currentUser?.photoURL ? (
          <Image src={currentUser?.photoURL} width={45} height={45} className="w-[45px] h-[45px] cursor-pointer hover:opacity-75 rounded-full object-cover" alt="profilepic" />
        ) : (
          
         
            <AiOutlineUser className="text-gray-600 text-[35px] rounded-full bg-gray-300 p-2 " />
         
        )}
</div>
    </div>
  )
}
