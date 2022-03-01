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
import { Link } from 'react-router-dom';

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
    list-style: disc;
    flex-wrap: wrap;
  `;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#ffffff", borderRadius: "2rem" })}
  `;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;

const Payment = styled.img`
      width: 50%;
  `;

const StyledLink = styled(Link)`
text-decoration: none;
color: black;
&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
${mobile({ fontSize: "12px", marginLeft: "10px" })}
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
                <Title>Billboards</Title>
                <List>
                    <StyledLink to="/billboard/penang-airport"><ListItem>Penang Airport</ListItem></StyledLink>
                    <StyledLink to="/billboard/komtar"><ListItem>Komtar</ListItem></StyledLink>
                    <StyledLink to="/billboard/inti-college-penang"><ListItem>Inti College Penang</ListItem></StyledLink>
                    <StyledLink to="billboard/padang-kota-lama"><ListItem>Padang Kota Lama</ListItem></StyledLink>
                    <StyledLink to="billboard/queensbay-mall"><ListItem>Queensbay Mall</ListItem></StyledLink>
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