import { auth } from "@/firebase/config";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


    export function googleHandler(router) {
const provider = new GoogleAuthProvider()
signInWithPopup(auth, provider).then((user)=> {
   router.push("/Facebook/Homepage")
})
    }