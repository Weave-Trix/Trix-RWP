import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import {addEventTicketWallet} from "./ticketWallet"
import { publicRequest, userRequest } from '../requestMethods';
import { addArtistEvent } from "./artistEvent";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        console.log("current user dispatching to redux store ==>> " + res.data.userId);
        dispatch(loginSuccess(res.data));
        await initTicket(dispatch, res.data.userId);
    }catch(err){
        dispatch(loginFailure());
    }
}

export const addTicket = async (dispatch, ticket)=>{
    try{
        console.log("running addTicket() at apiCalls.js")
        const res = await publicRequest.post("/tickets/forge/" + ticket.event.id, ticket);
        console.log("Forged ticket returned to apiCalls.js ")
        console.log("Res from forge ticket " + res);
        dispatch(addEventTicketWallet({ ticket }));
        console.log("Ticket added to redux");
    }catch(err) {
        console.log("failed to reach ticket/forge api");
    }
}

export const initTicket = async (dispatch, userId)=>{
    try{
        console.log("running initTicket() at apiCalls.js...");
        const res = await publicRequest.get("/tickets/find/" + userId);
        console.log("api responded...");
        res.data.map((ticket) => dispatch(addEventTicketWallet({ticket})));
        console.log(res.data);
        console.log("ticket wallet initialized");
    } catch(err) {
        console.log("failed to reach ticket/find/:userId");
    }
}

export const addEvent = async (dispatch, event)=>{
    try{
        console.log("running addEvent() at apiCalls.js")
        const res = await publicRequest.post("/events", event);
        console.log("Add event returned to apiCalls.js ")
        console.log("Res from add event " + res);
        dispatch(addArtistEvent({ event }));
        console.log("Event added to redux");
    }catch(err) {
        console.log("failed to reach event/ api");
    }
}