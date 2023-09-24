import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import JumbotronTemplate from '../components/JumbotronTemplate';

function Home() {
    const pageHeaderItems = {
        "TopWords": "SAIO",
        "BottomWords": "Our Student All-In-One Project"
    }

    return (
        <div>
            <JumbotronTemplate words={pageHeaderItems} />
        </div>
    )
}

export default Home;