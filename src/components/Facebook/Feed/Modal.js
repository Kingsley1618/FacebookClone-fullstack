'use client'
import React,{useState, useEffect} from "react"
import {AiOutlineClose} from "react-icons/ai"
import {auth, db} from "@/firebase/config"
import {AiOutlineUser} from "react-icons/ai"
import {IoMdPhotos} from "react-icons/io"
import {postHandler} from "@/utils/postUtils"
import Image from "next/image"
import {useAuth} from "@/context/authContext"
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Button, Modal } from 'antd';
const ModalPage = ({showModal, isModalOpen, handleCancel, handleOk}) => {
    const [user] = useDocument(db.collection('users')?.doc(auth?.currentUser?.uid));
    const {currentUser} = useAuth()
  const [postImage, setPostImage] = useState(null)
  const [btnAble, setBtnAble] = useState(true)
    const [postInput, setPostInput] = useState("")
    const [number, setNumber] = useState(0)
    function changeImage(event) {
        const selectedFile = event.target.files[0]
        if(!selectedFile || selectedFile === null) {
return false;
        } else {
            setPostImage(selectedFile)
            console.log(selectedFile)
        }
    }

    function changeInput(event) {
        setPostInput(event.target.value)
    }

    function postFunction() {
postHandler(postImage, postInput,number, currentUser)
handleCancel()
setPostInput("")
setPostImage(null)
    }

    useEffect(()=> {
if(postInput.trim().length < 1) {
  setBtnAble(true)
} else {
  setBtnAble(false)
}
    },[postInput])
  return (
  
      
      <Modal title="Create Post" open={isModalOpen} onCancel={handleCancel}>
      

        <hr></hr>

        <div className="flex gap-x-2 items-center px-2 my-3">
        {currentUser?.photoURL ? (
          <Image src={currentUser?.photoURL} width={45} height={45} className="w-[45] h-[45] cursor-pointer hover:opacity-75 rounded-full" alt="profilepic" />
        ) : (
          
         
            <AiOutlineUser className="text-gray-600 text-[35px] rounded-full bg-gray-300 p-2 " />
         
        )}

<div className="flex flex-col">
<h1 className="font-bold">
{currentUser?.displayName}
</h1>
<h1 className="bg-[rgb(228,230,235)] p-1 rounded-lg mt-1">Public</h1>
</div>

        </div>


        <div className="w-[100%] my-3">
        <input type="text" onChange = {changeInput} value = {postInput}  className="w-[100%] rounded-2xl w-[100%] bg-[rgb(240,242,245)] p-2 outline-0" placeholder={`What's on your mind,${currentUser?.displayName}`} />
        </div>



      <label htmlFor='postImage'>
    <input type="file" id="postImage" className="hidden" onChange={changeImage} accept='image/*,video/*' />
    
    <div className="border-[1px] p-2 w-[98%] flex justify-center items-center mx-auto block h-[200px] cursor-pointer border-[rgb(206,208,212)]">
{!postImage ?
<div className="bg-[rgb(247,248,250)] w-[100%] h-[100%] flex justify-center gap-y-1 flex-col items-center hover:bg-[rgb(234,235,237)]">
<IoMdPhotos className="text-[35px] p-2 bg-[rgb(216,218,223)]"/>

<h1>Add photos/videos</h1>



</div> : <Image src = {window.URL.createObjectURL(postImage)} alt="postimage" width={170} height={170} className="h-[170px] max-w-[300px] w-[100%] block mx-auto object-cover my-auto"/>}
    </div>
    
    
    </label>
<div className="px-2 mt-3">
    <button type="button" disabled= {btnAble} onClick = {postFunction} className="bg-[rgb(27,116,228)] py-2 w-[100%] rounded-md font-bold text-white text-center">Post</button>
    </div>
      </Modal>
 
  );
};
export default ModalPage;