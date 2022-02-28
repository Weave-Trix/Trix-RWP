import React from 'react';
import '../ManageEvents.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageEventCard from '../components/ManageEventCards';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function ManageEvents() {
    return (
        <div className="App" style={{position: "relative"}}>
            <Navbar />
            <div class="alignment">
                <ManageEventCard />
            </div>
            <div style={{marginTop: "5rem"}}/>
            <Footer />
        </div>
    );
}

export default ManageEvents;
