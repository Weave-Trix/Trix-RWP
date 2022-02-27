import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from "../redux/userRedux"
import { clearTicketWallet } from '../redux/ticketWallet';
import { clearArtistEvent } from '../redux/artistEvent';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userRedux";

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const LogoutItem = () => {
    //fetch data from slice
    const user = useSelector(selectUser);
    
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        console.log("calling clearTicketWallet()..")
        dispatch(clearTicketWallet());
        console.log("calling clearArtistEvent()..")
        dispatch(clearArtistEvent());
        console.log("logout successful")
    }
    return (
        <Container>
            <MenuItem onClick={(e) => handleLogout(e)} style={{ marginLeft: "0.8rem", marginRight: "0.2rem"}}>Logout <b>{user.username}</b></MenuItem>
        </Container>
    )
}

export default LogoutItem