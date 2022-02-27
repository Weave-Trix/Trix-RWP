import React from 'react';
import '../ManageEvents.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageEventCard from '../components/ManageEventCards';
import Navbar from '../components/Navbar';


function ManageEvents() {
    return (
        <div className="App">
            <Navbar />
            <div class="alignment">
                <ManageEventCard />
            </div>
        </div>
    );
}

export default ManageEvents;
