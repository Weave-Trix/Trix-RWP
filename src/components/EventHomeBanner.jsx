import { Button } from '@mui/material'
import { fontSize } from '@mui/system'
import React from 'react'
import styled from 'styled-components'
import { ConfirmationNumber } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { useLocation } from 'react-router-dom';
import { Timestamp } from '@firebase/firestore';
import PaymentButton from './PaymentButton';
import LoginButton from './LoginButton';
import { useSelector } from 'react-redux';
import { selectUser } from "../redux/userRedux";
import { mobile } from '../responsive';

const Container = styled.div`
    height: 18rem;
    display: flex;
    justify-content: center;
`

const ImgContainer = styled.div`
    height: 15rem;
    width: 25rem;
    position: absolute;
    z-index: 2;
    top: 150px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    ${mobile({ width: "16rem", height: "9rem", top: "15rem" })}
`

const SecondContainer = styled.div`
    margin-top: 90px;
    width: 100%;
    display: flex;
   justify-content: center;
`

const ThirdContainer = styled.div`
    margin-top: 10px;
    display: flex;
    padding: 50px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: aliceblue;
`

const InfoContainer = styled.div`
    justify-content: flex-start;
    flex-direction: column;
    display: flex;
    width: 620px;
    padding: 10px;
`

const DescriptionContainer = styled.div`
    width: 40vw;
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
    ${mobile({ width: "80vw" })}
`

const ButtonContainer = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
`

const BgImage = styled.img`
    flex: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(2.4px) brightness(75%);
`

const EventImage = styled.img`
    flex: none
`

const Title = styled.h1`
    text-align: center;
`

const ArtistDetail = styled.h3`
    text-align: center;
`

const DateText = styled.text`
    text-align: center;
    padding: 10px;
    font-size: 14.9px;
`

const Description = styled.text`
    text-align: justify;
    font-size: 15.4px;
    line-height: 25px;
`

const EventHomeBanner = () => {
    // get current user status
    const user = useSelector(selectUser);

    const [item, setItem] = useState(null);
    const [eventTitle, setEventTitle] = useState("");
    const [eventArtist, setEventArtist] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventImg, setEventImg] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventPrice, setEventPrice] = useState();
    const [eventStartDate, setEventStartDate] = useState();
    const [eventStartTime, setEventStartTime] = useState();
    const [eventEndDate, setEventEndDate] = useState();
    const [eventEndTime, setEventEndTime] = useState();

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    useEffect(() => {
        const getEvent = async () => {
            try {
                await publicRequest.get("/events/find/" + id).then(
                    docRef => {
                        console.log(docRef.data);
                        setEventTitle(docRef.data.title);
                        setEventDescription(docRef.data.description);
                        setEventImg(docRef.data.coverPhoto);
                        setEventLocation(docRef.data.location);
                        setEventArtist(docRef.data.artist);
                        setEventPrice(docRef.data.price.toFixed(2));
                        let firebaseStartTime = docRef.data.startTime.seconds;
                        let firebaseEndTime = docRef.data.endTime.seconds;
                        firebaseStartTime = new Date(firebaseStartTime * 1000);
                        firebaseEndTime = new Date(firebaseEndTime * 1000);
                        setEventStartDate(firebaseStartTime.toDateString());
                        setEventStartTime(firebaseStartTime.toLocaleTimeString('en-SG'));
                        setEventEndDate(firebaseEndTime.toDateString());
                        setEventEndTime(firebaseEndTime.toLocaleTimeString('en-SG'));
                        setItem(docRef.data);
                    });
            }
            catch { }
        };
        getEvent();
    }, [id]);

    return (
        <div>
            <Container>
                <BgImage src={eventImg} />
                <ImgContainer>
                    <EventImage src={eventImg} />
                </ImgContainer>
            </Container>
            <SecondContainer>
                <InfoContainer >
                    <Title>
                        {eventTitle}
                    </Title>
                    <DateText>
                        {eventStartDate + " - " + eventEndDate}
                    </DateText>
                    <DateText>
                        {eventStartTime + " - " + eventEndTime}
                    </DateText>
                    <DateText>
                        {eventLocation}
                    </DateText>
                    <ArtistDetail>
                        by
                    </ArtistDetail>
                    <ArtistDetail style={{ padding: "10px", fontSize: "21px" }}>
                        {eventArtist}
                    </ArtistDetail>
                    <ButtonContainer>
                        {item && (user ? <PaymentButton item={item} /> : <LoginButton />)}
                    </ButtonContainer>
                </InfoContainer>
            </SecondContainer>
            <ThirdContainer>
                <Title style={{ padding: "10px", marginBottom: "10px" }}>
                    What's in the Event?
                </Title>
                <DescriptionContainer>
                    <Description>
                        {eventDescription}
                    </Description>
                </DescriptionContainer>
            </ThirdContainer>
        </div>
    );
};

export default EventHomeBanner;