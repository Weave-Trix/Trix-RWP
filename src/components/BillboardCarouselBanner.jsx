import { ArrowLeftOutlined, ArrowRightOutlined, ConfirmationNumber, QrCode } from "@mui/icons-material";
import { style } from "@mui/system";
import { Button } from '@mui/material'
import { useState, useEffect } from "react";
import styled from "styled-components";
import React from "react";
import { publicRequest } from '../requestMethods';
import PaymentButton from "./PaymentButton";
import { Timestamp } from '@firebase/firestore';
import LoginButton from './LoginButton';
import { useSelector } from 'react-redux';
import { selectUser } from "../redux/userRedux";
import QRCode from "react-qr-code";
import { BASE_URL } from "../http-common";
import { useLocation } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { firestoreDb } from '../firebase/fs_setup_cache';
import { collection } from 'firebase/firestore';

// testing githubbb
const Container = styled.div`
  width: 100%;
  height:100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  justify-content: center;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: white;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 3.3;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: whitesmoke;
`;

const Title = styled.h1`
  font-size: 3rem;
  justify-content: flex-start;
  margin-bottom: 0.7rem;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-overflow: clip;
`;

/*
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  height: 40px;
  background-color: transparent;
  cursor: pointer;
  justify-content: flex-start;
`
*/

const Top = styled.div`
  align-items: left;
  flex-direction: column;
  padding-left: 2rem;
`

const Center = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
`

const Bottom = styled.div`
  flex-direction: column;
`

const QRContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Time = styled.h3`
  margin-top: 0.5rem;
`



const BillboardCarouselBanner = () => {
  const location = useLocation();
  const name = location.pathname.split("/")[2];
  // get current user status
  const user = useSelector(selectUser);
  console.log("banner checking user status : " + user);

  /*
    // API request
    const [events, setEvents] = useState([]);
    useEffect(() => {
      const getEvents = async () => {
        try {
          console.log("hihi i am ruka chan, here here");
          console.log(name);
          const res = await publicRequest.get("/events/billboard?name=" + name);
          setEvents(res.data);
          console.log(events);
        } catch (err) { }
      };
      getEvents()
    }, []);
    */

  // offline firestore
  const [events, setEvents] = useState([]);

  console.log("read billboard: " + name)
  const q = query(collection(firestoreDb, "events"), where("billboard", "array-contains", name))
  console.log("q setup success")
  onSnapshot(q, { includeMetaDataChanges: true }, (snapshot) => {
    // MONITOR UPDATES
    snapshot.docChanges().forEach((change) => {
      // LIVE DELETE
      if (change.type === "removed") {
        console.log("deleted: " + change.doc.data().payment.id)
        if (events.length > 0) {
          let count = -1;
          events.forEach((item) => {
            // if not suspect increase count
            if (change.doc.data().payment.id === item.payment.id) {
              // remove this event at this index
              var updatedEvents = events.splice(count, 1);
              setEvents(updatedEvents);
            }
            count = count + 1;
          })
        }
      }

      if (change.type === "added") {
        console.log("New event: ", change.doc.data());
        let exist = false;
        // suspected this event from firestore not exist in local
        let suspectRemovedEventPaymentId = change.doc.data().payment.id;
        console.log(suspectRemovedEventPaymentId + "this id suspected...........")
        // before events initialized, let the loop run
        if (events.length > 0) {
          // LIVE UPDATE
          events.forEach((item) => {
            // if document already exist, skip
            if (change.doc.data().payment.id === item.payment.id) {
              exist = true;
              suspectRemovedEventPaymentId = "";
            }
          })
        }

        // if document not exist in local but in firestore
        (exist === false) && setEvents([...events, change.doc.data()]);

      }

    })

    const source = snapshot.metadata.fromCache ? "local cache" : "server";
    console.log("Data came from " + source);
  })

  // Banner
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : (events.length - 1));
    } else {
      setSlideIndex(slideIndex < (events.length - 1) ? slideIndex + 1 : 0);
    }
  };
  const timeoutRef = React.useRef(null);

  // setTransition time (in millsec)
  const [delay, setDelay] = useState(5200);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    timeoutRef.current = setTimeout(
      () =>
        handleClick("right"),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [slideIndex, events]);

  // FormatDate
  function getTimestamp(timestamp) {
    let firebaseStartTime = timestamp.seconds;
    firebaseStartTime = new Date(firebaseStartTime * 1000);
    return firebaseStartTime;
  }

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {(events.length > 0) && events.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <EventImage src={item.coverPhoto} />
            </ImgContainer>
            <InfoContainer>
              <Top>
                <Title>{item.title}</Title>
                <Time style={{ fontSize: "1.5rem" }}>{getTimestamp(item.startTime).toDateString()}</Time>
                <Time>{getTimestamp(item.startTime).toLocaleTimeString('en-SG')}</Time>
                <Time style={{ fontSize: "1.2rem", marginTop: "0.8rem", fontWeight: "bolder" }}>{item.location}</Time>
              </Top>
              <Center>
                <Desc>{item.description}</Desc>
              </Center>
              <Bottom>
                <QRContainer>
                  <QRCode value={BASE_URL + "events/" + item.id} size={155} />
                </QRContainer>
                <LogoContainer>
                  <Logo>Trix</Logo>
                  <Logo style={{ fontSize: "0.6rem" }}>RWP</Logo>
                </LogoContainer>
              </Bottom>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default BillboardCarouselBanner;