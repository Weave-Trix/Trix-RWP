import styled from "styled-components";
import { fontSize } from '@mui/system';
import { style } from '@mui/system';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  align-items: center;
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
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: pink;
  color: white;
  cursor: pointer;
  margin: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align: center;
  margin-top: 2rem;
`;

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <LogoContainer>
                    <Logo>Trix</Logo>
                    <Logo style={{ fontSize: "2rem" }}>RWP</Logo>
                </LogoContainer>
                <Title>REGISTER</Title>
                <Form>
                    <Input placeholder="name" />
                    <Input placeholder="last name" />
                    <Input placeholder="username" />
                    <Input placeholder="email" />
                    <Input placeholder="password" />
                    <Input placeholder="confirm password" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>CREATE ACCOUNT</Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;