import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "ticketWallet",
    initialState:{
        tickets:[],
        quantity: 0,
    },
    reducers:{
        addEventTicketWallet:(state, action)=>{
            state.quantity += 1;
            state.tickets.push(action.payload);
        },
        clearTicketWallet: (state)=>{
            state.tickets = [];
            state.quantity = 0;
        },
    }
})

export const { addEventTicketWallet, clearTicketWallet, initEventTicketWallet } = cartSlice.actions;
export const selectTicketWallet = (state) => state.ticketWallet.tickets;
export default cartSlice.reducer;