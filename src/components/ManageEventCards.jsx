import React from 'react';
import { Card } from 'react-bootstrap';
import '../EventUpload.css';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: center;
  
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const ImageContainer = styled.div`
  overflow: hidden;
  flex: 2;
`
const InfoText = styled.text``


const ManageEventCards = () => {
  // fetch artistEvents from slice
  const artistEvents = useSelector(state => state.artistEvent.events);

  // FormatDate
  function getTimestamp(timestamp) {
    let firebaseStartTime = timestamp.seconds;
    firebaseStartTime = new Date(firebaseStartTime * 1000);
    return firebaseStartTime;
  }

  function getBillboardList(billboard) {
    let message = "";
    billboard.forEach((name) => {
      message = message + "(" + name + "), ";
    })
    message = message.slice(0, -2);
    return message;
  }

  return (
    <div>
      {(artistEvents.length === 0) && <h2 style={{ marginTop: "30vh", textAlign: "center" }}>No Event Published Yet,  Publish Your Event to Digital Billboard before you can manage them</h2>}
      {artistEvents.map((item) => (
        <>
          <Card style={{ height: "36vh", width: "50vw", borderRadius: "0.5rem" }}>
            <Container>
              <ImageContainer>
                <Card.Img variant="top" className="img" src={item.event.coverPhoto} style={{borderRadius: "1rem", height: "auto", width: "100%"}} />
              </ImageContainer>
              <InfoContainer>
                <Card.Body style={{ paddingBottom: 0 }}>
                  <Card.Title>{item.event.title}</Card.Title>
                  <InfoContainer>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Date:</b> {getTimestamp(item.event.startTime).toLocaleTimeString('en-SG')} - {getTimestamp(item.event.endTime).toDateString()}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Time:</b> {getTimestamp(item.event.startTime).toLocaleTimeString('en-SG')} - {getTimestamp(item.event.endTime).toLocaleTimeString('en-SG')}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Venue:</b> {item.event.location}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem", textOverflow: "ellipsis", display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}><b>Payment Receipt: </b>
                      <a href={item.event.payment.receipt_url} style={{ textDecoration: "none" }}>view receipt</a></InfoText>
                  </InfoContainer>
                </Card.Body>
                <hr style={{ border: "none", height: "1px" }} />
                <Card.Body style={{ paddingTop: 0 }}>
                  <InfoContainer>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Digital Billboards:</b> {getBillboardList(item.event.billboard)}{ }</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Ticket Remaining:</b> {(item.event.ticketQuantity) - (item.event.soldTicketList.length)}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Ticket Sold:</b> {item.event.soldTicketList.length}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Ticket Price:</b> ${Number(item.event.price).toFixed(2)}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Total Sales:</b> ${(Number(item.event.price) * Number(item.event.soldTicketList.length)).toFixed(2)}</InfoText>
                  </InfoContainer>
                </Card.Body>
              </InfoContainer>
            </Container>
          </Card>
          <br />
        </>
      ))
      }
    </div>
  )
}
export default ManageEventCards;