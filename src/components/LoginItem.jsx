import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    ${mobile({alignSelf: "center"})}
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    ${mobile({justifyContent: "center", alignSelf: "center" })}
`;


const LoginItem = () => {
    return (
        <Container>
            <StyledLink to="/register">
                <MenuItem style={{ marginLeft: "20px" }}>Register</MenuItem>
            </StyledLink>
            <StyledLink to="/login">
                <MenuItem style={{ marginLeft: "15px" }}>Login</MenuItem>
            </StyledLink>
        </Container>
    )
}

export default LoginItem