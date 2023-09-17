'use client'
import React,{useState, useEffect} from 'react'
import {BiDotsHorizontalRounded} from "react-icons/bi"
import Image from "next/image"
import {FaRegCommentAlt} from "react-icons/fa"
import {AiOutlineLike} from "react-icons/ai"
import {AiOutlineClose} from "react-icons/ai"
import {AiFillLike} from "react-icons/ai"
import {GoComment} from "react-icons/go"
import {PiShareFat} from "react-icons/pi"
import {useAuth} from "@/context/authContext"
import firebase from "firebase/compat/app";
import {auth, db} from "@/firebase/config"
import { useDispatch, useSelector } from 'react-redux'
import CommentSection from "./CommentSection"
import { useCollection } from 'react-firebase-hooks/firestore'
import { PostActions } from '@/redux/features/post/postSlice'

export default function Post() {
 

  const [post]= useCollection(db.collection('posts')?.orderBy('timeStamp','desc'))
  const dispatch = useDispatch()
  const postId = useSelector((state)=> state.postId)
  const [isCommentOpen, setIsCommentOpen] = useState(false);
const {currentUser} = useAuth()
const [likedPosts, setLikedPosts] = useState(new Set());
const [isLikeButtonLoading, setIsLikeButtonLoading] = useState(false);

async function addLike(postId, currentLikeStatus) {
  console.log("postId:", postId);
  console.log("currentLikeStatus:", currentLikeStatus);

  // Rest of the function...

  if (currentLikeStatus) {
    // User already liked the post, remove their like
    await postRef.update({
      likedBy: firebase.firestore.FieldValue.arrayRemove(uid),
      likes: firebase.firestore.FieldValue.increment(-1),
    });
  } else {
    // User hasn't liked the post, add their like
    await postRef.update({
      likedBy: firebase.firestore.FieldValue.arrayUnion(uid),
      likes: firebase.firestore.FieldValue.increment(1),
    });
  }

  // Log the updated data
  const updatedData = await postRef.get();
  console.log("Updated Data:", updatedData.data());
}

function selectHandler(id) {
dispatch(PostActions.selectId({id:id}))
console.log(postId)
}
const showComment = () => {
  setIsCommentOpen(true);
};
function deletePost(id){
  db.collection('posts')?.doc(id).delete()
}
  return (
    <>
    {post?.docs?.map((postItem) => {
       const isLiked = likedPosts.has(postItem.id);
      return (
      <div key = {postItem.id} className="flex flex-col bg-white w-[100%] max-w-[600px] mx-auto rounded-xl my-5 py-2">

<div className="flex justify-between px-3  items-center py-2">
<div className="flex gap-x-2 items-center">
<Image src={postItem?.data().photoOfUser} className="rounded-full" width={50} height={50} alt="user"/>

<div>
<h1 className="font-bold">{postItem?.data()?.userOfPost}</h1>
<p className="text-[rgb(101,103,107)] text-[12px]"> 
{new Date(postItem?.data()?.timeStamp?.toDate()).toUTCString()}</p>
</div>
</div>

<div className="flex sm:gap-x-3 gap-x-1">
    <BiDotsHorizontalRounded className="text-[45px] cursor-pointer hover:bg-[rgb(242,242,242)] rounded-full p-3"/>

   {currentUser?.uid === postItem?.data()?.uid? <AiOutlineClose className="text-[45px] cursor-pointer hover:bg-[rgb(242,242,242)] rounded-full p-3" onClick ={()=> deletePost(postItem.id)}/> : null }

</div>
</div>

<div className="px-2 max-w-[550px] w-[100%] mx-auto block">
{postItem?.data()?.inputOfPost}
</div>

<div className="">
<Image
  src={postItem?.data()?.imageOfPost}
width={600}
height={600}
  className="h-[auto] w-full max-w-[600px] max-h-[400px]"
  alt="postImage"
/>

</div>




<div className="flex justify-between my-3 items-center px-4">
    <div className="flex gap-x-2 items-center cursor-pointer">
    <AiFillLike className="text-white bg-[rgb(5,113,229)] text-[20px] rounded-full p-1"/>
<h1 className="text-[rgb(179,180,182)]">{postItem?.data()?.likes}</h1>
    </div>


    <div className="flex gap-x-4 items-center">
<div className="flex gap-x-1 items-center cursor-pointer"><h1 className='text-[rgb(179,180,182)]'>0</h1><FaRegCommentAlt className="text-[rgb(179,180,182)] text-[15px]"/></div>



<div className="flex gap-x-1 items-center cursor-pointer"><h1 className='text-[rgb(179,180,182)]'>0</h1><PiShareFat className="text-[20px] text-[rgb(179,180,182)]"/></div>


    </div>
</div>



<div className="w-full px-3">
    

<div className="flex mt-2 items-center flex-wrap">
<div
  className={`flex-1 flex justify-center items-center gap-x-2 hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2`}
  onClick={async () => {
    if (!isLiked && !isLikeButtonLoading) {
      setIsLikeButtonLoading(true); // Set loading state
      await addLike(postItem.id, isLiked);
      setIsLikeButtonLoading(false); // Reset loading state
    }
  }}
  
>
  <AiOutlineLike className={`text-[22px] ]  ${isLiked ? 'text-[blue]' : ''}`} />
  <div className="text-[rgb(124,126,129)] text-[0.8rem] font-semibold">Like</div>
</div>

      <div className="flex-1 flex justify-center items-center gap-x-2 flex-wrap hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2" onClick={()=> {
        selectHandler(postItem?.id)
        showComment()
        }}>
        <GoComment className="text-[22px] "/>
        <div className="text-[rgb(124,126,129)] text-[0.8rem] font-semibold">
            Comment
        </div>
      </div>

      <div className="flex-1 sm:flex hidden justify-center items-center gap-x-2 hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2">
<PiShareFat className="text-[22px]"/>

<div className="text-[rgb(124,126,129)] text-[0.8rem] font-semibold">Share</div>


      </div>
    </div> 
    


</div>




    </div>
    
  )})}
  <CommentSection isCommentOpen = {isCommentOpen} setIsCommentOpen = {setIsCommentOpen}/>
  </>
)
}
