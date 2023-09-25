import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JumbotronTemplate from '../components/JumbotronTemplate';
import Usertable from '../components/UserTable';
import "bootstrap/dist/css/bootstrap.min.css";
import UserTable from '../components/UserTable';

function View2() {
    const pageHeaderItems = {
        "TopWords": "View 2",
        "BottomWords": "These are the users that have been entered"
    }

    const [userList, setUserList] = useState([{}])

    // Reads all users. Sends the GET request to API
    useEffect(() => {
        axios.get('https://seal-app-8qhxt.ondigitalocean.app/api/user')
        .then(res => {
            setUserList(res.data)
        })
    }, []);

    return (
        <div>
            <JumbotronTemplate words={pageHeaderItems} />
            <br />
            <div className='container justify-items-center align-items-center'>
                <UserTable userList={userList} />
            </div>
            
        </div>
    )
}

export default View2;