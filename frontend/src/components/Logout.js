import React from 'react';
import Button from 'react-bootstrap/Button'
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// logout get setter setUser from App.js
// everytime the parents renders, the childs are rendered, and pass back some properties?
function Logout({ setUser }) {
    const navigate = useNavigate();

    const onSuccess = () => {
        googleLogout();  // helper for logging out, GoogleLogout component logs the user out with Google
        setUser(null);  // set user back to null;
        localStorage.setItem("login", null);  // clearing local storage,
        console.log('Logout made successfully');
        navigate("../");
      };
    

    return (
        <div>
            <Button variant='btn btn-outline-secondary' onClick={onSuccess} >
                LogOut
            </Button>
        </div>
    );
}

export default Logout;