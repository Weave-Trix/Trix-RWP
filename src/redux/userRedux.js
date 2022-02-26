import { createSlice } from "@reduxjs/toolkit";
import { useHistory } from 'react-router-dom';
import { clearTicketWallet } from "./ticketWallet";

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logout: (state)=>{
            state.currentUser = null;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export const selectUser = (state) => state.user.currentUser;
export default userSlice.reducer;