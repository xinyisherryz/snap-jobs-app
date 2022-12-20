import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { GoogleOAuthProvider } from "@react-oauth/google";

import DashBoard from "./components/DashBoard"
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";
import { HomePage } from "./components/HomePage";
import Profile from './components/Profile';
import AddJob from './components/AddJob';
import JobList from "./components/JobList";
import Job from "./components/Job";
import AcceptedJobsDetails from "./components/AcceptedJobsDetails";
import PendingJobsDetails from "./components/PendingJobsDetails";
import InterviewDetails from "./components/InterviewDetails";
import DeclinedJobsDetails from "./components/DeclinedJobsDetails";


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);

  const updateUser = useCallback(() => {
    addData.user = user;
    editData.user = user;
  },[user]);

  var addData = {
    editMode : false,
    user: user
  }

  var editData = {
    editMode : true,
    user: user
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now() / 1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);


  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App shadow-sm p-3 mb-5 bg-body rounded">
      <Navbar className='ui right floated header'>
          <Container className="container—fluid">
            <Navbar.Brand className="brand" href="/">
              SNAPJOBS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic—navbar—nav" />
            <Navbar.Collapse id="responsive—navbar—nav">
            { user && (
              <Nav className='ui raised very padded segment'>
              <Nav.Link as={Link} to={"/dashboard"}>
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to={"/search"}>
                Search
              </Nav.Link>
              <Nav.Link as={Link} to={'/jobs/addJob'}>
                Add Job
              </Nav.Link>
              <Nav.Link as={Link} to={'/profile'}>
                Profile
              </Nav.Link>
            </Nav>
            )}
            </Navbar.Collapse>
            { user ? (    //ternary conditional
                <Logout setUser={setUser} /> // when there is a user, we can logout
              ) : (
                <Login setUser={setUser} /> // when nobody's here,(user = null), we can login
              )}
          </Container>
        </Navbar>
      <Routes>
        <Route exact path={"/"} element={<HomePage />}/>
        <Route exact path={"/search"} element={<JobList user={ user }/>}/>
        <Route exact path={"/dashboard"} element={<DashBoard user={ user } />}/>
        <Route exact path={"/profile"} 
               element={<Profile user={ user } />}/>
        <Route exact path={"/jobs/addJob"} 
               element={<AddJob data ={ addData } />}/>
        <Route exact path={"/jobs/:id/"} element={
          <Job userData={ user } />}
          />
        <Route exact path={"/jobs/:id/edit"} element={
          <AddJob data={editData}/>}
          />
        {/* Routes to cards components in dashboard */}
        <Route exact path={"/accepted"} element={<AcceptedJobsDetails />}/>
        <Route exact path={"/pending"} element={<PendingJobsDetails />}/>
        <Route exact path={"/interview"} element={<InterviewDetails />}/>
        <Route exact path={"/declined"} element={<DeclinedJobsDetails />}/>

      </Routes>
    </div>
  </GoogleOAuthProvider>
  );
}

export default App;

