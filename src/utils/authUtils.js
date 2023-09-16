import { auth } from "@/firebase/config";
import { db } from "@/firebase/config";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

export function createAccount(email, password, router) {
  
createUserWithEmailAndPassword(auth, email, password).then((userCredential)=> {
const user = userCredential.user
console.log(user)
if(user) {
    db.collection("users").doc(user.uid).set({
        email:user.email,
        photoURL : user.photoURL,
        uid : user.uid,
        photoURL: null,
        displayName : null
    })
    router.push("/Dashboard")
    }
}).catch((err)=> {
    console.log(err)
})
}

export function signInAccount(email, password, router) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=> {
    const user = userCredential.user
    console.log(user)
    if(user) {
    router.push("/Dashboard")
    }
    }).catch((err)=> {
        console.log(err)
    })
    }

    export function googleHandler() {
const provider = new GoogleAuthProvider()
signInWithPopup(auth, provider).then((user)=> {
    console.log(user)
})
    }