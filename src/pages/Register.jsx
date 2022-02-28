import styled from "styled-components";
import { fontSize } from '@mui/system';
import { style } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { publicRequest } from '../requestMethods';
import { login } from "../redux/apiCalls";
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
  border: none;
  padding: 15px 20px;
  background-color: pink;
  color: white;
  margin: 1rem;
  cursor: hand;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align: center;
  margin-top: 2rem;
  ${mobile({ width: "80vw"})}
`;

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [hasUsername, setHasUsername] = useState(false)

  useEffect(() => {
    setIsValid(false);
    ((password == confirmPassword) && (password !== "")) && setIsValid(true)
  }, [password, confirmPassword])
  
  useEffect(() => {
    setHasUsername(false);
    (username !== "") && setHasUsername(true);
  }, [username])

  const handleClick = async (e) => {
    e.preventDefault();
    await publicRequest.post("/auth/register", {username, password});
    login(dispatch, {username, password})
  }

  return (
    <Container>
      <Wrapper>
        <LogoContainer>
          <Logo>Trix</Logo>
          <Logo style={{ fontSize: "2rem" }}>RWP</Logo>
        </LogoContainer>
        <Title>REGISTER</Title>
        <Form>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="confirm password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {(!hasUsername) && <b style={{color: "red"}}>You must provide a username</b>}
          {(isValid && hasUsername) && <Button style={{ position: "relative", zIndex: "5", cursor: "hand", pointerEvents: "auto"}} onClick={handleClick}>CREATE ACCOUNT</Button>}
          {(!isValid) && <Button style={{ cursor: "none", backgroundColor: "#ababab" }}>Reconfirm password</Button>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;