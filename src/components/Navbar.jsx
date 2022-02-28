import { Badge, Menu } from "@material-ui/core";
import { ConfirmationNumberOutlined, Favorite, FavoriteBorder, Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { selectUser } from "../redux/userRedux";
import Login from '../pages/Login';
import LoginItem from "./LoginItem";
import LogoutItem from "./LogoutItem";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 4rem;
  align-items: center;
  position: relative;
  bottom: 0.3rem;
  ${mobile({ bottom: 0 })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  align-self: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const ArtistContainer = styled.div`
    ${mobile({ display: "none" })}
    display: flex;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Message = styled.span`
  font-size: 14px;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  align-items:center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  padding: 5px;
  border-radius: 5px;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: center;
  ${mobile({ position: "absolute", right: "5px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px", position: "absolute", right: "80vw", top: "1px" })}
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  // fetch data from slice
  const user = useSelector(selectUser);
  const ticketWalletQuantity = useSelector(state => state.ticketWallet.quantity);
  const artistEventQuantity = useSelector(state => state.artistEvent.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <StyledLink to="/">
            <LogoContainer>
              <Logo>Trix</Logo>
              <Logo style={{ fontSize: "12px" }}>RWP</Logo>
            </LogoContainer>
          </StyledLink>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
          <ArtistContainer>
            <StyledLink to="/artist/publish-event">
              {user && ((user.isArtist) && <Message>Publish Event</Message>)}
            </StyledLink>
            <StyledLink to="/artist/manage-events">
              {user && ((user.isArtist) && <Message style={{ marginLeft: "1.4rem" }}>Manage Events ({(artistEventQuantity == 0) ? 0 : artistEventQuantity})</Message>)}
            </StyledLink>
          </ArtistContainer>
        </Left>
        <Right>
          <StyledLink to="/my-tickets">
            <MenuItem style={{ marginRight: "20px" }}>
              <Badge badgeContent={ticketWalletQuantity} color="primary">
                <ConfirmationNumberOutlined />
              </Badge>
            </MenuItem>
          </StyledLink>
          {user ? <LogoutItem /> : <LoginItem />}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;