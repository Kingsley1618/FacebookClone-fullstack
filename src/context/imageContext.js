'use client'
import { createContext, useContext, useState } from "react";
const ImageContext  = createContext()
export function ImageProvider ({children}) {
    const [image, setImage] = useState('')
    const [input, setInput] = useState(null)
    function inputHandler(event) {
       setInput(event.target.value)
   }
       function changeHandler(event) {
           const selectedFile = event.target.files[0]
   if(selectedFile) {
       setImage(selectedFile)
       console.log(image)
   }
       }

       return <ImageContext.Provider value = {{image, input, inputHandler, changeHandler}}>
        {children}
       </ImageContext.Provider>
}

export function useImage() {
    return useContext(ImageContext)
}
