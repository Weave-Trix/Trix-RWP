import React from 'react'
import EventHomeBanner from '../components/EventHomeBanner';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const EventHome = () => {
    return (
        <div>
            <Navbar />
            <EventHomeBanner />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default EventHome;
