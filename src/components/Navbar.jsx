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

const Container = styled.div`
  height: 4rem;
  align-items: center;
  position: relative;
  bottom: 0.3rem;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  align-self: center;
`;

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
`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
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
          <StyledLink to="/artist/publish-event">
            {user && ((user.isArtist) && <Message>Publish Event</Message>)}
          </StyledLink>
          <StyledLink to="/artist/publish-event">
            {user && ((user.isArtist) && <Message style={{marginLeft: "1.4rem"}}>Manage Events ({(artistEventQuantity==0)? 0 : artistEventQuantity})</Message>)}
          </StyledLink>
        </Left>
        <Right>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <FavoriteBorder />
            </Badge>
          </MenuItem>
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