import React from 'react'
import Navbar from '../components/Navbar'
import CarouselBanner from '../components/CarouselBanner'
import Artists from '../components/Artists'
import EventList from '../components/EventListLimited';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <CarouselBanner />
            <EventList />
            <Artists />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home;
