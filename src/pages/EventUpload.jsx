import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import NumericInput from 'react-numeric-input';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Forms from "../components/Forms";
import DateTime from "../components/DateTime"
import UploadFiles from '../components/upload-files.component';
import Navbar from '../components/Navbar';
import '../EventUpload.css';
import UploadService from "../services/upload-files.service";
import { Button } from '@mui/material';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { ConfirmationNumber, Payment } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MultipleSelectChip from '../components/MultiSelectBillboard';
import StripeCheckout from 'react-stripe-checkout'
import { publicRequest, userRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect, Router, useHistory } from 'react-router-dom';
import { addEvent } from '../redux/apiCalls';

const PaymentContainer = styled.div`
    padding-top: 3rem;
    padding-left: 10rem;
    padding-right: 10rem;
    display: flex;
    height: auto;
    width: 88%;
    justify-content: space-between;
    align-items: center;
`

const PaymentDescriptionContainer = styled.div`
    display: flex;
    justify-content: flex-start;

    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
`

const PaymentTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const LeftDetailsContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
`

const RightDetailsContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    margin-bottom: 3rem;
`

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: white;
`;

const Image = styled.img`
  height: 80%;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 3;
  width: auto;
`;

const InfoContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
  width: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: whitesmoke;
`;

const Title = styled.h1`
  font-size: 1.3rem;
  justify-content: flex-start;
  margin-bottom: 0.7rem;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 1.0rem;
  font-weight: 500;
  letter-spacing: 1px;
  height: 100%;
  width: 100%;
  word-wrap: break-word;
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
  flex: 2;
  display: flex;
  flex-direction: column;
`

const Center = styled.div`
  flex: 3;
  display: flex;
`

const Bottom = styled.div`
  flex: 1;
  display: flex;
  height: 10vh;
`

const ProtoButtonContainer = styled.div`
  height: 4rem;
`
const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Time = styled.h6`
  margin-top: 0.5rem;
  word-wrap: break-word;
`

const PreviewContainer = styled.div`
    height: 30rem;
    width: 88%;
    margin-bottom: 1rem;
`

const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 8rem;
`

const StyledButton = styled(Button)` 

`

const EventUpload = () => {
    // fetch current user from redux store
    const currentUser = useSelector((state) => state.user.currentUser);

    const [form, setForm] = useState({
        title: "",
        description: "",
        coverPhoto: "https://alxgroup.com.au/wp-content/uploads/2016/04/dummy-post-horisontal.jpg",
        location: "",
        artistId: currentUser.userId,
        artist: "",
        startTime: "",
        endTime: "",
        price: 1.00,
        ticketQuantity: 50,
        billboard: [],
        soldTicketList: []
    })
    // Payment and Upload Event

    // Stripe
    const KEY = "pk_test_51KVK8VLgmHChReqD4pRxgriLf0qbb6KfJWZ5zuut1w9i9TocIitIhaACRfyYSiNx21OfsxOBh46aFjI5NzOcOZsc00EETUx8bS"
    const [stripeToken, setStripeToken] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
    const onToken = (token) => {
        setStripeToken(token);
        console.log(token.amount + "stripe token");
    }

    // redux dispatch ticket
    const dispatch = useDispatch();
    const addToArtistEvent = async (paymentDetails) => {
        console.log("checking userId before dispatch : " + currentUser.userId)
        console.log("running addToTicketList() at PaymentButton.jsx");
        console.log("FORM checking here " + form);
        console.log("addEvent apicall")
        await addEvent(dispatch, { ...form, payment: paymentDetails });
    }

    // End of Payment and Upload Event
    useEffect(() => {
        const makeRequest = async () => {
            console.log("useEffect here");
            try {
                const res = await publicRequest.post(
                    "/checkout",
                    {
                        tokenId: stripeToken.id,
                        amount: (totalPrice) * 100,
                    });
                console.log("redux api call");
                console.log("stripe data" + res);
                addToArtistEvent(res.data);
                console.log("redirecting")
                history.push("/artist/manage-events");
            } catch (err) {
                console.log(err + "hihi ruka chan");
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, history])


    const [totalPrice, setTotalPrice] = useState(1000 * form.billboard.length.toFixed(2))

    useEffect(() => {
        setTotalPrice(1000 * form.billboard.length.toFixed(2))
        console.log(form);
    }, [form])

    const [formTbRoot, setFormTbRoot] = useState({
        title: "",
        description: "",
        location: "",
        artist: "",
    })

    useEffect(() => {
        setForm(
            {
                ...form,
                title: formTbRoot.title,
                description: formTbRoot.description,
                location: formTbRoot.location,
                artist: formTbRoot.artist,
            }
        );
    }, [formTbRoot]);

    // date
    const [dateInterval, setDateInterval] = useState({
        startTime: "",
        endTime: "",
    });
    useEffect(() => {
        console.log("Date selection succeeded: " + dateInterval.startTime.toString())
        setForm(
            {
                ...form,
                startTime: dateInterval.startTime,
                endTime: dateInterval.endTime,
            }
        );
        console.log(form);
    }, [dateInterval]);

    // image
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        console.log("Image url assigned to json");
        setForm(
            {
                ...form,
                coverPhoto: imageUrl,
            }
        );
        console.log(form);
    }, [imageUrl]);

    const [boxQuantity, setBoxQuantity] = useState(100);
    let updateQuantity = boxQuantity => {
        setBoxQuantity(boxQuantity)
    }
    useEffect(() => {
        setForm({
            ...form,
            ticketQuantity: boxQuantity

        });
    }, [boxQuantity])

    const [billboard, setBillboard] = useState([]);
    useEffect(() => {
        setForm({
            ...form,
            billboard: billboard
        });
    }, [billboard])

    const [boxPrice, setBoxPrice] = useState(1);
    useEffect(() => {
        setForm({
            ...form,
            price: Number(boxPrice).toFixed(2)
        });
    }, [boxPrice])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <div>
            <Navbar />
            <div className='alignment'>
                <FormContainer>
                    <Forms setFormTbRoot={setFormTbRoot} />
                    <UploadFiles setFormTbRoot={setFormTbRoot} setImageUrl={setImageUrl} />
                    <DateTime setFormTbRoot={setFormTbRoot} setDateInterval={setDateInterval} />

                    <br></br><p>Event Ticket's Price</p>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        allowDecimals={{ Boolean: "true" }}
                        allowNegativeValue={{ Boolean: "false" }}
                        intlConfig={{ locale: 'en-US', currency: 'USD' }}
                        decimalSeparator="."
                        defaultValue={form.price}
                        decimalsLimit={2}
                        onValueChange={(value, name) => setBoxPrice(value)}
                    /><br></br>

                    <br></br><p>Event Ticket's Quantity</p>
                    <NumericInput placeholder="Enter ticket's quantity" value={boxQuantity} onChange={updateQuantity} min={1} step={5} />
                </FormContainer>
                <h2>Billboard Event Preview</h2>
                <PreviewContainer>
                    <Slide bg={form.coverPhoto}>
                        <ImgContainer>
                            <EventImage src={form.coverPhoto} />
                        </ImgContainer>
                        <InfoContainer>
                            <Top>
                                <Title>{form.title}</Title>
                                <Time style={{ fontSize: "1rem" }}>{form.startTime.toString().slice(0, 15)}</Time>
                                <Time style={{ fontSize: "0.9rem" }}>{form.startTime.toString().slice(15, 21)}</Time>
                                <Time style={{ fontSize: "0.8rem", marginTop: "0.8rem", fontWeight: "bolder" }}>{form.location}</Time>
                            </Top>
                            <Center>
                                <Desc>{form.description}</Desc>
                            </Center>
                            <Bottom>
                                <ProtoButtonContainer>
                                    <StyledButton variant="contained" startIcon={<ConfirmationNumber />} >
                                        $ {form.price}
                                    </StyledButton>
                                </ProtoButtonContainer>
                            </Bottom>

                        </InfoContainer>
                    </Slide>
                </PreviewContainer>
                <PaymentContainer>
                    <LeftDetailsContainer>
                        <PaymentDescriptionContainer>
                            <PaymentTextContainer>

                                <h5>Total Price : $ {1000 * form.billboard.length}   </h5>
                                <h6 style={{ fontWeight: "bolder" }}>Billboard quantity : {form.billboard.length} {<h6>($ 1000 each)</h6>}</h6>
                                <h7>Event : {form.title}</h7>
                                <h7>Organized by: {form.artist}</h7>
                                <h7>Location : {form.location}</h7>
                                <h8>Event Date : {form.startTime.toString().slice(3, 15)} - {form.endTime.toString().slice(3, 15)}</h8>
                                <h8>Event Time : {form.startTime.toString().slice(15, 21)} - {form.endTime.toString().slice(15, 21)}</h8>
                            </PaymentTextContainer>
                        </PaymentDescriptionContainer>
                    </LeftDetailsContainer>
                    <RightDetailsContainer>
                        <MultipleSelectChip setBillboard={setBillboard} />
                    </RightDetailsContainer>
                </PaymentContainer>
                {(totalPrice === 0) ?
                    <ButtonContainer><Button variant="contained" disabled>Please choose your Billboards</Button></ButtonContainer>
                    : <ButtonContainer>
                        <StripeCheckout
                            name="Trix pay"
                            image="https://i.pinimg.com/736x/33/a2/41/33a2410638d29d3ffba27bed5052b56f.jpg"
                            billing
                            description="Event Advertising, Online + Digital Billboards"
                            amount={(totalPrice) * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button variant="contained" color="secondary">
                                Submit Event $ {totalPrice}
                            </Button>
                        </StripeCheckout>
                    </ButtonContainer>}


            </div>
            <Footer />
        </div>
    );
}

export default EventUpload