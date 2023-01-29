import React from 'react';
import {Link} from "react-router-dom"

const Error = () => {
    
    return (
        <div>
                <br/>
                <br/>
                <br/>
                <h1>Error.</h1>
                <br />
                <h2>Something went wrong..</h2>
                <br/>
                <p>Click below to go back main page.</p>
                <Link to='/'>Home</Link>
        </div>
    );
};

export default Error;