import React,{useState, useEffect} from 'react'
import Image from "next/image"
import { Button, Modal } from 'antd';
import {FaRegCommentAlt} from "react-icons/fa"
import {AiOutlineLike} from "react-icons/ai"
import firebase from "firebase/compat/app";
import {useAuth} from "@/context/authContext"
import {auth, db} from "@/firebase/config"
import {AiOutlineSend} from "react-icons/ai"
import {AiFillLike} from "react-icons/ai"
import {PiShareFat} from "react-icons/pi"
import {GoComment} from "react-icons/go"
import {useSelector} from "react-redux"
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
export default function CommentSection({isCommentOpen, setIsCommentOpen}) {
    const postId = useSelector((state)=> state.postId)
    const [text, setText] = useState("")
    const [disableBtn, setDisableBtn] = useState(true)
    const [comment] = useDocument(postId ? db.collection("posts").doc(postId) : null);
    const {currentUser} = useAuth()
    const [messageText] = useCollection(
        postId &&
          db
            .collection('posts')
            .doc(postId)
            .collection('comment')
            .orderBy('timeStamp', 'asc')
      );
  const handleOk = () => {
    setIsCommentOpen(false);
  };
  const handleCancel = () => {
    setIsCommentOpen(false);
  };
  function addLike(id, currentLikeStatus, currentLike) {
    db.collection('posts')?.doc(id)?.update({likeStatus : !currentLikeStatus})
    const newLikesCount = currentLikeStatus ? currentLike - 1 : currentLike + 1
    db.collection('posts')?.doc(id)?.update({ likes: newLikesCount })
  }

  function addComment() {
    db.collection("posts").doc(postId)?.collection("comment").add({text, photoURL : currentUser?.photoURL, user: currentUser?.displayName,timeStamp: firebase.firestore.FieldValue.serverTimestamp()})
    setText("")
  }
  useEffect(()=> {
if(text.trim().length < 1) {
    setDisableBtn(true)
} else {
    setDisableBtn(false)
}
  },[text])
  return (
   <>
  
    {postId &&
      <Modal title="Comment" className="" open={isCommentOpen} onCancel={handleCancel}>
      <div className="w-[100%] max-h-[60vh] h-[100%] flex flex-col">
       <div className="my-2 flex-1" style={{overflowY: "scroll"}}>
<div className="flex gap-x-2">
    <Image src = {currentUser.photoURL} width = {40} height = {40} className="rounded-full w-[40px] h-[40px]" alt="commentprof"/>


    <div className="flex flex-col">
        <h1 className="font-bold text-[1.2rem]">{comment?.data()?.userOfPost}</h1>
        <p className="text-[0.6rem]">{new Date(comment?.data()?.timeStamp?.toDate()).toUTCString()}</p>
    </div>
</div>

<div className="px-2 mx-auto block">{comment?.data()?.inputOfPost}</div>
      <div className="w-[100%]">
<Image src={comment?.data().imageOfPost} width={100} height={100} className="w-[100%] h-[200px] rounded-lg"/>
      </div>


      <div className="flex justify-between my-3 items-center px-4">
    <div className="flex gap-x-2 items-center cursor-pointer">
    <AiFillLike className="text-white bg-[rgb(5,113,229)] text-[20px] rounded-full p-1"/>
<h1 className="text-[rgb(179,180,182)]">{comment?.data()?.likes}</h1>
    </div>

<div className="flex gap-x-1 items-center cursor-pointer"><h1 className='text-[rgb(179,180,182)]'>0</h1><FaRegCommentAlt className="text-[rgb(179,180,182)] text-[15px]"/></div>

</div>







<div className="w-full px-3">
    

<div className="flex mt-2 items-center flex-wrap">
<div
  className={`flex-1 flex justify-center items-center gap-x-2 hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2`}
  onClick={() => addLike(comment?.id, comment?.data()?.likeStatus, comment?.data().likes)}
>
  <AiOutlineLike className={`text-[22px] ${comment?.data()?.likeStatus ? "text-[blue]" : ""}`} />
  <div className="text-[rgb(124,126,129)] text-[0.8rem] font-semibold">Like</div>
</div>

      <div className="flex-1 flex justify-center items-center gap-x-2 flex-wrap hover:bg-[rgb(242,242,242)] rounded-lg cursor-pointer p-2" >
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

 <div>
  {messageText?.docs.map((comm)=> {
    return <div className="flex my-2" key = {comm.id}>
<Image src={comm?.data()?.photoURL} className="rounded-full w-[30px] h-[30px]" width = {30} height={30} alt="comment"/>

<div className="w-[100%] max-w-[350px] rounded-lg p-2 break-words bg-gray-300" style={{width:"fit-content"}}>
    <h1 className="font-bold">{comm?.data()?.user}</h1>
    <div className="text-[14px]">{comm?.data()?.text}</div>
    </div>
        </div>
    
   })}
 </div>
   </div>


<div className="flex gap-x-1  bg-white shadow-lg p-2 z-[2] flex-wrap w-[100%] items-center">
<Image src = {currentUser?.photoURL} width = {40} height = {40} className="rounded-full w-[40px] h-[40px]" alt="user"/>

<input type="text" value={text} onChange={(event)=> setText(event.target.value)} className="flex-1 rounded-2xl w-[100%] bg-[rgb(240,242,245)] p-2 outline-0" placeholder={`Write your comment,${currentUser?.displayName}`} />
<button type="button" disabled={disableBtn} className="text-[35px] cursor-pointer" onClick = {addComment}><AiOutlineSend /></button>
</div>
</div>
      </Modal>
      }
   </>
  )
}
