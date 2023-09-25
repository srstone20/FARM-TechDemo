import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JumbotronTemplate from '../components/JumbotronTemplate';
import "bootstrap/dist/css/bootstrap.min.css";

function View1() {
    const pageHeaderItems = {
        "TopWords": "View 1",
        "BottomWords": "Enter your name to receive a greeting"
    }

    const [id, setID] = useState('')
    const [name, setName] = useState('')

    // Create / Post a User
    const addUserHandler = () => {
        axios.post('https://farm-backend-demo-7lzad.ondigitalocean.app/api/user', {
            'id': id,
            'name': name
        })
        .then(res => console.log(res))
    };

    return (
        <div>
            <JumbotronTemplate words={pageHeaderItems} />
            <br />
            <div className='container'>
                <div>
                    <p>Hello {name}!</p>
                </div>
                <br />
                <span className='card-text'>
                    <input className='mb-2 form-control' onChange={event => setID(event.target.value)} placeholder='ID' />
                    <input className='mb-2 form-control' onChange={event => setName(event.target.value)} placeholder='Name' />
                    <button id='subButton' className='btn btn-outline-primary mx-2 mb-2' onClick={addUserHandler}>Add task</button>
                </span>
            </div>
        </div>
    )
}

export default View1;
