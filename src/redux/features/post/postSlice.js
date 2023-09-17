'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId : null
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers: {
        selectId(state, action) {
            state.postId = action.payload.id
        }
    }
})

export const PostActions = postSlice.actions
export default postSlice.reducer;