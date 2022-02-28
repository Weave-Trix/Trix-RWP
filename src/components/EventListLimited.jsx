import { Grid } from '@mui/material'
import React from 'react'
import EventCard from './EventCard';
import styled from 'styled-components';
import { sliderItems } from '../data';
import { MoreHoriz } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';


const Container = styled.div`
  margin-left: 9vw;
  margin-right: 9vw;
`;

const TitleContainer = styled.div`
  margin-top: 100px;
  padding: 0.5vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  ${mobile({marginTop: "4rem"})}
`

const ViewMoreContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 20px;
`

const Title = styled.text`
  font-size: 37px;
  font-weight: bolder;
  padding: 10px;
`

const Description = styled.text`
  font-size: 20px;
  padding: 4px;
`

const ViewMore = styled.text`
  padding: 8px;
  font-size: 18px;
  font-weight: bolder;
  cursor: pointer;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        console.log("hihi i am ruka chan, here here");
        const res = await publicRequest.get("/events");
        setEvents(res.data);
      } catch (err) { }
    };
    getEvents()
  }, []);
  return (
    <Container>
      <TitleContainer>
        <Title>
          Upcoming Events
        </Title>
        <Description>
          Don't say I BOJIO.
        </Description>
        <Description>
          I JIO you to all these boring events.
        </Description>
      </TitleContainer>
      <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: "30px", view: "flex", justifyContent: "center" }}>
        {events.slice(0, 6).map((item) => (
          <Grid item xs={4} sm={4} md={4} key={item.id} style={{ display: "flex", justifyContent: "center" }}>
            <EventCard item={item} key={item.id} />
          </Grid>
        ))}

      </Grid>
      <StyledLink to={`/events`}>
        <ViewMoreContainer>

          <ViewMore>
            View All Events
          </ViewMore>
          <MoreHoriz />

        </ViewMoreContainer>
      </StyledLink>
    </Container>
  )
}

export default EventList
