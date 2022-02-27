import React from 'react'
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import CarouselBanner from '../components/CarouselBanner';
import BillboardCarouselBanner from '../components/BillboardCarouselBanner';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { fontSize } from '@mui/system';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`

const ButtonContainer = styled.div`
   width: 100vw;
   height: 100vh;
   align-items: center;
   justify-content: center;
   display: flex;
`

const Billboard = () => {
  const handle = useFullScreenHandle();
  return (
    <Container>
      <ButtonContainer>
        <button onClick={handle.enter} style={{padding: "6rem"}}>
        <h1>CLICK HERE TO</h1>
          <h1>LOAD BILLBOARD</h1>
        </button>
      </ButtonContainer>
      <FullScreen handle={handle}>
        <BillboardCarouselBanner />
      </FullScreen>
    </Container>
  )
}

export default Billboard;