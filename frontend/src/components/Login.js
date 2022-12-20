


// export const Login = (props) => {
//     const [ email, setEmail ] = useState('');
//     const [ password, setPassword ] = useState('');

//     //Capture when user submit the form
//     const handleSubmit = (event) => {
//         event.preventDefault(); // to prevent the page form getting reloaded, reuslts in we loose out state
//         console.log(email);
//     }
//     return (

//         <div className="auth-form-container">
//             <h2>LogIn</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email"> Email </label>
//                 <input
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                     type="email" placeholder="Your email address" id="email" name="email" 
//                 />
//                 <label htmlFor="password"> Password </label>
//                 <input 
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     type="password" placeholder="*********" id="password" name="password" 
//                 />
//                 <button type="submit">LogIn</button>
//             </form>
//             <button
//                 className="link-button"
//                 onClick={() => props.onFormSwitch('register')}> Not a member yet?Register here 
//             </button>
//         </div>
//     )
// }

// GOOGLE AUTHENTICATION PART TEMPERARILY COMMENTED OUT
// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// function Login({ setUser }) {
//   const onSuccess = (res) => {
//     var tokenData = jwt_decode(res.credential);
//     var loginData = {
//       googleId: tokenData.sub,
//       ...tokenData,
//     };
//     console.log("jwt: " + loginData);
//     setUser(loginData);
//     localStorage.setItem("login", JSON.stringify(loginData));
//     // console.log(loginData);
//   };
//   const onFailure = (res) => {
//     console.log("Login failed: res:", res);
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={"single_host_origin"}
//         style={{ marginTop: "100px" }}
//         isSignedIn={true}
//         auto_select={true}
//       />
//     </div>
//   );
// }

// export default Login;


// import React from "react";
// import { useState } from "react";
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import JobDataService from '../services/jobs.js';

// export const Login = ( setUser ) => {
//     const navigate = useNavigate();

//     const [ email, setEmail ] = useState('');
//     const [ password, setPassword ] = useState('');

//     //Capture when user submit the form
//     const handleSubmit = (event) => {
//         event.preventDefault(); // to prevent the page form getting reloaded, reuslts in we loose out state
//         var token = {
//           user_email : email
//         }
        
//         JobDataService.authenticate(token)
//           .then(response => {
//             if (password === response.data){
//               setUser(email);
//               navigate("../");
//               console.log(response.data);
//             } else {
//               console.log("Wrong Password/Email");
//             }
//           })
//           .catch(e => {
//             console.log(e);
//           })

//         // console.log(email);
//     }
//     return (

//         <div className="auth-form-container">
//             <h2>LogIn</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email"> Email </label>
//                 <input
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                     type="email" placeholder="Your email address" id="email" name="email" 
//                 />
//                 <label htmlFor="password"> Password </label>
//                 <input 
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     type="password" placeholder="*********" id="password" name="password" 
//                 />
//                 <button type="submit">LogIn</button>
//             </form>
//             <button
//                 className="link-button"
//                 onClick={() => navigate("../register")}> Not a member yet?Register here 
//             </button>
//         </div>
//     )
// }

// export default Login;



import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode  from 'jwt-decode';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login({ setUser }) {
    
    const onSuccess = (res) => {
        var tokenData = jwt_decode(res.credential);  //takes the JWT credential, parses it with jwt_decode
        var loginData = {
          googleId: tokenData.sub, // tokenData.sub field to stand in for our googleId value.
          ...tokenData
        }
        setUser(loginData);
        localStorage.setItem("login", JSON.stringify(loginData));
      };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    }

    return (  // returns the component to be rendered
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
                auto_select={true}
            />
        </div>
    );
}

export default Login;