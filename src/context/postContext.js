'use client'
import { createContext, useContext, useState } from "react";
const postContext  = createContext()
export function PostProvider ({children}) {
    const [postId, setPostId] = useState(null)
   
 
       return <postContext.Provider value = {{postId, setPostId}}>
        {children}
       </postContext.Provider>
}

export function usePost() {
    return useContext(postContext)
}
