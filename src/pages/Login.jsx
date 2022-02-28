import styled from "styled-components";
import { fontSize } from '@mui/system';
import { style } from '@mui/system';
import { useState } from 'react';
import { login } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "contents"})}
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  align-items: center;
  ${mobile({ display: "contents"})}
`

const LogoContainer = styled.div`
    padding: 2rem;
    align-items: center;
    display: flex;
    justify-content: center;
`

const Logo = styled.h1`
    font-size: 6.2rem;
    font-weight: bold;
    ${mobile({ fontSize: "5rem"})}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin: 1rem 0;
  padding: 0.6rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border-color: whitesmoke;
`;

const Button = styled.button`
  width: 6rem;
  border: none;
  padding: 15px 20px;
  background-color: pink;
  color: white;
  cursor: pointer;
  margin: 1rem;
  margin-top: 2rem;
  border-radius: 1rem;
  &:disabled{
    color: red;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 1.2rem;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({ fontSize: "1rem" , textAlign: "center"})}
`;

const Error = styled.span`
color: red;
padding: 1rem;
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {username, password});
  }

  return (
    <Container>
      <Wrapper>
        <LogoContainer>
          <Logo>Trix</Logo>
          <Logo style={{ fontSize: "2rem" }}>RWP</Logo>
        </LogoContainer>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Wrong login info!</Error>}
          <StyledLink to="/register">create account</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;