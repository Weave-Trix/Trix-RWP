import { createSlice } from "@reduxjs/toolkit";

const artistEventSlice = createSlice({
    name: "artistEvent",
    initialState:{
        events: []
    },
    reducers:{
        addArtistEvent:(state, action)=>{
            state.quantity += 1;
            state.events.push(action.payload);
        },
        clearArtistEvent: (state)=>{
            state.events = [];
            state.quantity = 0;
        },
    }
})

export const { addArtistEvent, clearArtistEvent, initArtistEvent } = artistEventSlice.actions;
export const selectArtistEvent = (state) => state.artistEvent.events;
export default artistEventSlice.reducer;