'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import Facebook from "@/assets/svg/facebook.svg"

import { useRouter } from 'next/navigation'

import { googleHandler } from '@/utils/authUtils'


export default function Login() {

const router = useRouter()

  return (
    <div className="bg-[rgb(240,242,245)] w-[100%] h-screen flex md:items-center justify-center p-[30px]">

<div className="w-[100%] max-w-[1000px] flex md:flex-row flex-col md:gap-x-[60px]">

<div className="md:flex-1 md:mt-5">
<Image src = {Facebook} width = {300} height = {20} className="md:relative md:left-[-30px] md:ml-0 mx-auto" alt="facebook"/>
    <div className="text-[1.4rem] md:relative md:top-[-12px] w-[100%] md:max-w-[100%] max-w-[400px]  md:ml-0 mx-auto">Facebook helps you connect and share with the people in your life.</div>
</div>


<div className="md:flex-1 justify-center flex">
<form className="bg-white p-3 rounded-md">  
<h1 className="text-center font-bold">LOGIN</h1>
 <button type="button"  className="mx-auto block bg-gray-300 cursor-pointer p-3 mt-2 font-bold text-white max-w-[190px] rounded-md w-[100%]" onClick = {()=> googleHandler(router)}>Sign In With Google</button>
          </form>

</div>
</div>


    </div>
  )
}
