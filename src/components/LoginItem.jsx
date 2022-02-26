import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const LoginItem = () => {
    return (
        <Container>
            <StyledLink to="/register">
                <MenuItem style={{ marginLeft: "20px" }}>Sign Up</MenuItem>
            </StyledLink>
            <StyledLink to="/login">
                <MenuItem style={{ marginLeft: "15px" }}>Login</MenuItem>
            </StyledLink>
        </Container>
    )
}

export default LoginItem