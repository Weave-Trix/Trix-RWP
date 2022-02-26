import React from 'react'
import { Button } from '@mui/material'
import styled from 'styled-components';
import { Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    bottom: 0px;
    margin: 0.4rem;
`
const StyledButton = styled(Button)`
    color: "#6A6869"  

`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const LoginButton = () => {
    return (
        <StyledLink to="/login">
            <ButtonContainer>
                <StyledButton variant="contained" startIcon={<Login />}>
                    Login to View More
                </StyledButton>
            </ButtonContainer>
        </StyledLink>
    )
}

export default LoginButton