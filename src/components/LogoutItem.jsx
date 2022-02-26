import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from "../redux/userRedux"
import { clearTicketWallet } from '../redux/ticketWallet';

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
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        console.log("calling clearTicketWallet()..")
        dispatch(clearTicketWallet());
    }
    return (
        <Container>
            <MenuItem onClick={(e) => handleLogout(e)} style={{ marginLeft: "20px" }}>Logout</MenuItem>
        </Container>
    )
}

export default LogoutItem