import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Forms = ({ setFormTbRoot }) => {
    const [formTb, setFormTb] = useState({
        title: "",
        description: "",
        location: "",
        artist: "",
    })

    useEffect(() => {
        setFormTbRoot(formTb);
    }, [formTb]);

    let updateTitle = function (p_title) {
        setFormTb({
            ...formTb,
            title: p_title,
        });
    }

    let updateDesc = function (p_desc) {
        setFormTb({
            ...formTb,
            description: p_desc,
        });
        console.log(formTb);
    }

    let updateLocation = function (p_location) {
        setFormTb({
            ...formTb,
            location: p_location,
        });
        console.log(formTb);
    }

    let updateArtist = function (p_artist) {
        setFormTb({
            ...formTb,
            artist: p_artist,
        });
        console.log(formTb);
    }



    return (
        <div>
            <Form style={{ marginTop: "30px" }}>
                <h1>Event Details</h1>
                <br />
                <Form.Group >
                    <Form.Label>Event's Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={formTb.title} onChange={e => updateTitle(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group >
                    <Form.Label>Event's Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" value={formTb.description} onChange={e => updateDesc(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group >
                    <Form.Label>Event's Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" value={formTb.location} onChange={e => updateLocation(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group >
                    <Form.Label>Event's Artist</Form.Label>
                    <Form.Control type="text" placeholder="Enter artist's name" value={formTb.artist} onChange={e => updateArtist(e.target.value)} />
                </Form.Group>
                <br />
            </Form>
        </div>
    )
}

export default Forms;