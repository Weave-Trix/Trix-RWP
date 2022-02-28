import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 1rem;
    background-color: lightseagreen;
    ${mobile({ flexDirection: "column" })}
  `;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
  `

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
  `;

const SocialContainer = styled.div`
    display: flex;
  `;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
  `;

const Title = styled.h3`
    margin-bottom: 30px;
  `;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
  `;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;

const Payment = styled.img`
      width: 50%;
  `;

const Footer = () => {
    return (
        <Container>
            <Left>
                <LogoContainer>
                    <Logo>Trix</Logo>
                    <Logo style={{ fontSize: "12px" }}>by WEAVE</Logo>
                </LogoContainer>
                <Desc>
                    Developed for Inti College Penang Real World Project 260CDE under guidance of En. Shahriman 
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>WishList</ListItem>
                    <ListItem>List of Artists</ListItem>
                    <ListItem>Events</ListItem>
                    <ListItem>For Artists</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Tickets</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> Myvi Lap into your Heart, Pulau Song Song
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +7181 488
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> donaldtrump@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    );
};

export default Footer;