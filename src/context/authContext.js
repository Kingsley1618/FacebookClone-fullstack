'use client'
import { createContext, useContext, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import {auth} from "@/firebase/config"
import {useRouter} from "next/navigation"
const AuthContext = createContext()
export function AuthProvider({children}) {
const [currentUser, setCurrentUser] = useState();
const router = useRouter()
onAuthStateChanged(auth, (user) => {
    if (user) {
     setCurrentUser(user)
     router.push("/Facebook/Homepage")
    } else {
    router.push("/")
    }
  })

  return <AuthContext.Provider value = {{currentUser}}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}