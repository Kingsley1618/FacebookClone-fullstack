'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import Facebook from "@/assets/svg/facebook.svg"
import style from "./login.module.css"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup';
import {AiFillEye} from "react-icons/ai"
import { googleHandler } from '@/utils/authUtils'
import { signInAccount } from '@/utils/authUtils'
import {AiFillEyeInvisible} from "react-icons/ai"
import { useFormik} from 'formik';

export default function Login() {
const [open, setOpen] = useState(false)
const router = useRouter()

const initialValues = {
    email : "",
    password : ""
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required("Email address"),
    password: Yup.string()
      .required("Password is required").min(4),
  });

const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:(values)=> {
      console.log(values)
      signInAccount(values.email, values.password, router)
    }
})
  return (
    <div className="bg-[rgb(240,242,245)] w-[100%] h-screen flex md:items-center justify-center p-[30px]">

<div className="w-[100%] max-w-[1000px] flex md:flex-row flex-col md:gap-x-[60px]">

<div className="md:flex-1 md:mt-5">
<Image src = {Facebook} width = {300} height = {20} className="md:relative md:left-[-30px] md:ml-0 mx-auto"/>
    <div className="text-[1.4rem] md:relative md:top-[-12px] w-[100%] md:max-w-[100%] max-w-[400px]  md:ml-0 mx-auto">Facebook helps you connect and share with the people in your life.</div>
</div>


<div className="md:flex-1 justify-center flex">
<form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-y-3 bg-white max-w-[400px] w-[100%] h-[370px] p-5 shadow-2xl rounded-md"
          >
            <input
              type="text"
              placeholder="Email address"
              className={`border-gray-200 border-[1px] p-3 rounded-md focus:outline-[rgb(27,116,228,0.5)] focus:shadow-[rgb(27,116,228,0.5)] focus:shadow-sm ${
               formik.errors.email
                  ? 'border-red-500' // Add red border on validation error
                  : ''
              }`}
              {...formik.getFieldProps('email')}
            />
       

            <div className={`w-[100%] border-gray-200 border-[1px] p-3 rounded-md flex ${
                  formik.errors.password
                    ? 'border-red-500' // Add red border on validation error
                    : ''
                }`}>
              <input
                type={open? "text" : "password"}
                className={`outline-0 flex-[0.94] w-[100%]`}
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              {open ? (
                <AiFillEye
                  className="ms-auto self-center cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="ms-auto self-center cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
         

            <input
              type="submit"
           className="bg-[rgb(24,119,242)] rounded-md text-white cursor-pointer font-bold block mx-auto text-[20px] text-center w-[100%] p-3"
            value="Log in"
            />
            

            <h1 className="text-[rgb(24,119,243)] text-[13px] text-center my-2">
              <Link href="#">Forgotten password?</Link>
            </h1>
            <hr className="my-2 border-t border-gray-200" />

            <button type="button" onClick={()=> router.push("/auth/createAccount")} className="mx-auto block bg-[rgb(66,183,42)] cursor-pointer p-3 mt-2 font-bold text-white max-w-[190px] rounded-md w-[100%]">Create new account</button>
            <hr />   
            <button type="button"  className="mx-auto block bg-gray-300 cursor-pointer p-3 mt-2 font-bold text-white max-w-[190px] rounded-md w-[100%]" onClick = {()=> googleHandler()}>Sign In With Google</button>
          </form>

</div>
</div>


    </div>
  )
}
