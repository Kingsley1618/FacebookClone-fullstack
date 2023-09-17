import firebase from "firebase/compat/app";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db } from "@/firebase/config";

import 'firebase/compat/storage';

export async function postHandler(postImage, postInput, number, currentUser) {
   
  const storageRef = firebase.storage().ref(`/posts/${postImage.name}`);
  const uploadTask = uploadBytesResumable(storageRef, postImage);

 
    storageRef.put(postImage);

 
    const url = await getDownloadURL(uploadTask.snapshot.ref);

    // Add the post to the Firestore collection
    await db.collection('posts').add({ 
      imageOfPost: url,
      inputOfPost: postInput,
      userOfPost: currentUser?.displayName,
      likes: number,
      likeStatus: false,
      photoOfUser: currentUser?.photoURL,
      uid: currentUser?.uid,
      email: currentUser?.email,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log("Successful");
  } 

