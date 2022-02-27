import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useState, useEffect } from 'react';
import { addEventTicketWallet } from '../redux/ticketWallet';
import { publicRequest, userRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styledCom from 'styled-components';
import { Button } from '@mui/material'
import { ConfirmationNumber } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { addTicket } from '../redux/apiCalls';
const ButtonContainer = styledCom.div`
`
const StyledButton = styledCom(Button)`
    backgroundColor: "#6A6869"  

`

export default function PaymentButton({ item }) {
    // fetch current user from redux store
    const currentUser = useSelector((state) => state.user.currentUser);

    // Stripe
    const KEY = "pk_test_51KVK8VLgmHChReqD4pRxgriLf0qbb6KfJWZ5zuut1w9i9TocIitIhaACRfyYSiNx21OfsxOBh46aFjI5NzOcOZsc00EETUx8bS"
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const onToken = (token) => {
        setStripeToken(token);
        console.log(token.amount + "stripe token");
    }

    // redux dispatch ticket
    const dispatch = useDispatch();
    const addToTicketList = async (paymentDetails) => {
        console.log("checking userId before dispatch : " + currentUser.userId)
        console.log("running addToTicketList() at PaymentButton.jsx");
        await addTicket(dispatch, { payment: paymentDetails, userId: currentUser.userId, event: item })
    }

    useEffect(() => {
        const makeRequest = async () => {
            console.log("useEffect here");
            try {
                const res = await publicRequest.post(
                    "http://localhost:3001/api/checkout",
                    {
                        tokenId: stripeToken.id,
                        amount: item.price * 100,
                    });
                console.log("redux api call");
                console.log("stripe data" + res);
                addToTicketList(res.data);
                history.push("/my-tickets", { stripeData: res.data });
            } catch (err) {
                console.log(err + "hihi ruka chan");
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, history])

    return (
        <ButtonContainer>
            <StripeCheckout
                name="Trix pay"
                image="https://i.pinimg.com/736x/33/a2/41/33a2410638d29d3ffba27bed5052b56f.jpg"
                billing
                description={item.title}
                amount={(item.price) * 100}
                token={onToken}
                stripeKey={KEY}
            >
                <StyledButton variant="contained" startIcon={<ConfirmationNumber />} >
                    $ {item.price}
                </StyledButton>

            </StripeCheckout>
        </ButtonContainer>
    )
}