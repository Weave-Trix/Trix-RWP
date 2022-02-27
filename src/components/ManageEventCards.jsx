import React from 'react';
import { Card } from 'react-bootstrap';
import firstEvent from "../images/first_event.png";
import secondEvent from "../images/second_event.png";
import thirdEvent from "../images/third_event.png";
import '../EventUpload.css';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
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
      {artistEvents.map((item) => (
        <>
          <Card style={{ width: "60vw", borderRadius: "0.5rem"}}>
            <Container>
              <Card.Img variant="top" className="img" src={item.event.coverPhoto} style={{ padding: "0.3rem", borderRadius: "1rem" }} />
              <InfoContainer>
                <Card.Body style={{paddingBottom: 0}}>
                  <Card.Title>{item.event.title}</Card.Title>
                  <InfoContainer>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Date:</b> {getTimestamp(item.event.startTime).toDateString()} - {getTimestamp(item.event.endTime).toDateString()}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Time:</b> {getTimestamp(item.event.startTime).toLocaleTimeString('en-SG')} - {getTimestamp(item.event.endTime).toLocaleTimeString('en-SG')}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Venue:</b> {item.event.location}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem", textOverflow: "ellipsis", display: "inline-block", overflow: "hidden", whiteSpace: "nowrap"}}><b>Payment Receipt: </b> 
                      <a href={item.event.payment.receipt_url} style={{textDecoration: "none"}}>view receipt</a></InfoText>
                  </InfoContainer>
                </Card.Body>
                <hr style={{border: "none", height: "1px"}}/>
                <Card.Body style={{paddingTop: 0}}>
                  <InfoContainer>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Digital Billboards:</b> {getBillboardList(item.event.billboard)}{ }</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Ticket Remaining:</b> {(item.event.ticketQuantity)-(item.event.soldTicketList.length)}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Ticket Sold:</b> {item.event.soldTicketList.length}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Ticket Price:</b> ${item.event.price.toFixed(2)}</InfoText>
                    <InfoText style={{ fontSize: "0.85rem" }}><b>Total Sales:</b> ${((item.event.price) * (item.event.soldTicketList.length)).toFixed(2)}</InfoText>
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