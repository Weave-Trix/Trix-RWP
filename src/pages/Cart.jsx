import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { style } from '@mui/system';
import { useSelector } from 'react-redux';
import { Timestamp } from '@firebase/firestore';
import ticketWallet, { selectTicketWallet } from "../redux/ticketWallet";

const Container = styled.div``;

const ImgContainer = styled.div`
    height: 8rem;
    width: 15.1rem;
    z-index: 2;
    top: 150px;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    align-self: center;
`

const QrContainer = styled.div`
    height: 8rem;
    width: 8rem;
    z-index: 2;
    top: 150px;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    align-self: center;
`

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TopTexts = styled.div`
    display: flex;
    justify-content: center;
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Info = styled.div`
  flex: 3;
`;

const Event = styled.div`
  display: flex;
  justify-content: center;
`;

const EventDetail = styled.div`
  flex: 2;
  display: flex;
  width: 20rem;
  height: 10rem;
`;

const Image = styled.img`
  width: 100%;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 25rem;
`;

const EventName = styled.span``;

const EventDate = styled.span``;

const Spacing = styled.div`
  height: 1.9rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const EventVenue = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Box = styled.div`
  padding-left: 20%;
  padding-right: 20%;
`

const Cart = () => {
  // fetch tickets from ticketWalletSlice
  const ticketList = useSelector(selectTicketWallet);
  console.log("retrieving ticketList from slice ");

  // FormatDate
  function getTimestamp(timestamp) {
    let firebaseStartTime = timestamp.seconds;
    firebaseStartTime = new Date(firebaseStartTime * 1000);
    return firebaseStartTime;
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>TICKETS</Title>
        <Top>
          <TopTexts>
            <TopText>Upcoming Events({ticketList.length})</TopText>
            <TopText>Event History (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
        <Box>
          {ticketList.map((item) => (
            <Info>
              <Event>
                <EventDetail>
                  <ImgContainer>
                    <Image src={item.ticket.event.coverPhoto} />
                  </ImgContainer>
                  <Details>
                    <EventName>
                      <b>Event:</b> {item.ticket.event.title}
                    </EventName>
                    <EventDate>
                      <b>Date:</b> {getTimestamp(item.ticket.event.startTime).toDateString()}
                      <b style={{ paddingLeft: "1rem" }}>Time:</b> {getTimestamp(item.ticket.event.startTime).toLocaleTimeString('en-SG')}
                    </EventDate>
                    <Spacing />
                    <EventVenue>
                      <b>Venue:</b> {item.ticket.event.location}
                    </EventVenue>
                    <b style={{ textOverflow: "ellipsis", display: "inline-block", overflow: "hidden", whiteSpace: "nowrap"}}>Payment Receipt: 
                      <a href={item.ticket.payment.receipt_url} style={{textDecoration: "none"}}> view receipt</a></b>
                  </Details>
                </EventDetail>
                <QrContainer>
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
                </QrContainer>
              </Event>
              <Hr />
            </Info>
          ))}
          </Box>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;