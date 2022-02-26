import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import styledCom from 'styled-components';
import { Button } from '@mui/material'
import { ConfirmationNumber } from '@mui/icons-material';
import { style } from '@mui/system';
import { useState, useEffect } from 'react';
import { addEventTicketWallet } from '../redux/ticketWallet';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { publicRequest, userRequest } from '../requestMethods';
import { useHistory } from 'react-router-dom';
import PaymentButton from './PaymentButton';
import LoginButton from '../components/LoginButton';
import { selectUser } from '../redux/userRedux';

const StyledLink = styledCom(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const ButtonContainer = styledCom.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%,
    height: 100%,
    position: relative;
    bottom: 0px;
    margin: 0.4rem;
`

const Title = styledCom.text`
  font-weight: bold;
  font-size: 1.0rem;
`

export default function EventCard({ item }) {
  // get current user status
  const user = useSelector(selectUser);
  console.log(item.id);

  // format firebase timestamp
  let firebaseStartTime = item.startTime.seconds;
  firebaseStartTime = new Date(firebaseStartTime * 1000);
  let eventStartDate = firebaseStartTime.toDateString();

  return (
    <Card sx={{ maxWidth: 345 }} style={{ marginBottom: "2.2rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={
          <Title>
            {item.title}
          </Title>
        }
        subheader={eventStartDate}
      />
      <StyledLink to={`/events/${item.id}`}>
        <CardMedia
          component="img"
          height="194"
          image={item.coverPhoto}
        />
        <CardContent style={{ height: "6rem" }}>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </StyledLink>
      <CardActions disableSpacing>
        {user? <PaymentButton item={item} /> : <LoginButton />}
      </CardActions>
    </Card>
  );
}
