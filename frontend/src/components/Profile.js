import React, { useState, useEffect, Profiler, useCallback } from "react";
import JobDataService from "../services/jobs";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';


const Profile = ( {user} ) => {

    const [hasProfile, setHasProfile] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [industry, setIndustry] = useState("");
    const [jobFunction, setJobFunction] = useState("");

    const retrieveProfiles = useCallback(() => {
        if (user != null) {
            JobDataService.getProfileById(user.googleId)
            .then(response => {
                console.log(response.data);
                if (response.data != null) {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setLocation(response.data.location);
                    setIndustry(response.data.industry);
                    setJobFunction(response.data.jobFunction);
                    setHasProfile(true);
                }
            }).catch(e => {
                console.log(e);
            })
        }
    }, [user])

    useEffect(() =>{
        if ( user != null ) {
            retrieveProfiles();   
        }
    }, [retrieveProfiles, user]);

    const onChangeFirstName = e => {
        const firstName = e.target.value;
        setFirstName(firstName);
    }

    const onChangeLastName = e => {
        const lastName = e.target.value;
        setLastName(lastName);
    }

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangeLocation = e => {
        const location = e.target.value;
        setLocation(location);
    }

    const onChangeIndustry = e => {
        const industry = e.target.value;
        setIndustry(industry);
    }

    const onChangeJobFunction = e => {
        const jobFunction = e.target.value;
        setJobFunction(jobFunction);
    }

    const saveProfile = () => {
        var data = {
            user_id : user.googleId,
            firstName : firstName,
            lastName : lastName,
            email : email,
            location : location,
            industry : industry,
            jobFunction : jobFunction
        }

        JobDataService.postProfile(data)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updateProfile = () => {
        var data = {
            user_id : user.googleId,
            firstName : firstName,
            lastName : lastName,
            email : email,
            location : location,
            industry : industry,
            jobFunction : jobFunction
        }

        JobDataService.updateProfile(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e.response.data);
            })
    }


    return (
        <Container className='main-container'>
            <Stack direction="horizontal" gap="2" className="mb-4">
		    <h1 className="me-auto text-muted" fontFamily="Arial">MY PROFILE</h1>
		    </Stack>
            <Form>
                <Form.Group className='fg1'>
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter first name</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        firstName={ firstName }
                        onChange={ onChangeFirstName }
                        placeholder="First Name"
                        defaultValue={ firstName }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter last name</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        lastName={ lastName }
                        onChange={ onChangeLastName }
                        placeholder="Last Name"
                        defaultValue={ lastName }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter email</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        email={ email }
                        onChange={ onChangeEmail }
                        placeholder="Email"
                        defaultValue={ email }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter location</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        location={ location }
                        onChange={ onChangeLocation }
                        placeholder="Location"
                        defaultValue={ location }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter industry</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        industry={ industry }
                        onChange={ onChangeIndustry }
                        placeholder="Industry"
                        defaultValue={ industry }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter job function</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        jobFunction={ jobFunction }
                        onChange={ onChangeJobFunction }
                        placeholder="Job Function"
                        defaultValue={ jobFunction }
                    />
                    
                </Form.Group>

                { hasProfile ? (
                    <Button variant='outline-success' onClick={ updateProfile }>
                    Update Profile 
                    </Button>
                ) : (
                    <Button variant='outline-success' onClick={ saveProfile }>
                    Post Profile
                    </Button>
                )}
            </Form>
        </Container>
    )

}

export default Profile;