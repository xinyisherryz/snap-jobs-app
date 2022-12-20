// add, update is here, delete job is in Job.js

import React, { useCallback, useEffect, useState } from 'react';
import JobDataService from "../services/jobs";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Stack } from 'react-bootstrap';


const AddJob = ({ data }) => {
    
    console.log(data)
    const navigate = useNavigate()  // enable us to send our user back to the job page when the job has been submitted

    let params = useParams();

    // no using uselocation since we have two separate page for add and update, 
    // so just need to pass in an data.editMode(boolean) to let the the component know what to do;
    let editing = data.editMode;  // a boolean that will distinguish whether we are creating a new job

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [jobType, setJobType] = useState("");
    const [location, setLocation] = useState("");
    const [jobStatus, setJobStatus] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [trackingSite, setTrackingSite] = useState("");
    const [notes, setNotes] = useState("");
    const [ddl, setDDL] = useState("");

    // use the data type Date() for deadline
    const [deadline, setDeadline] = useState(new Date());

    // if we are editing an existing job
    const retrieveExistingJob = useCallback(() => {
        if (editing === true) {
            JobDataService.getJobById(params.id)
                .then(response => {
                    setCompany(response.data.company);
                    setPosition(response.data.position);
                    setJobType(response.data.jobType);
                    setLocation(response.data.location);
                    setJobStatus(response.data.jobStatus);
                    setCompanyWebsite(response.data.companyWebsite);
                    setTrackingSite(response.data.trackingSite);
                    setNotes(response.data.notes);
                    setDeadline(response.data.deadline);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, []);

    useEffect(() => {
        retrieveExistingJob();
    }, [retrieveExistingJob])

    // if we're editing an existing job
    // called whenever there are changes, and will update state using setters
    const onChangeCompany = e => {  
        const company = e.target.value;
        setCompany(company);
    }
    const onChangePosition = e => {  
        const position = e.target.value;
        setPosition(position);
    }
    const onChangeJobType = e => {  
        const jobType = e.target.value;
        setJobType(jobType);
    }
    const onChangeLocation = e => {  
        const location = e.target.value;
        setLocation(location);
    }
    const onChangeJobStatus = e => {  
        const jobStatus = e.target.value;
        setJobStatus(jobStatus);
    }
    const onChangeCompanyWebsite = e => {  
        const companyWebsite = e.target.value;
        setCompanyWebsite(companyWebsite);
    }
    const onChangeTrackingSite = e => {  
        const trackingSite = e.target.value;
        setTrackingSite(trackingSite);
    }
    const onChangeNotes = e => {  
        const notes = e.target.value;
        setNotes(notes);
    }
    const onChangeDeadline = e => {  
        const deadline = e.target.value;
        setDeadline(deadline);
    }

    // put together a data object & 
    // send it to the jobs service method to be submitted to the backend via API call
    const saveJob = () => {

        var packedData = {
            user_id: data.user.googleId,
            company: company,
            position: position,
            jobType: jobType,
            location: location,
            jobStatus: jobStatus,
            companyWebsite: companyWebsite,
            trackingSite: trackingSite,
            notes: notes,
            deadline: deadline
        }

        if (editing) {
            // TODO: Handle case where an exisiting
            // job is being updated
            // get the job id
            packedData.job_id = params.id  // get from the url params (:id)

            console.log(`ADD JOB frontend: `)
            console.log(`userid: ${packedData.user_id}`);
            console.log(`jobId ${packedData.job_id}`);
            console.log(`company ${company}`);
            console.log(`position ${position}`);
            console.log(`jobType ${jobType}`);
            console.log(`location ${location}`);
            console.log(`jobStatus ${jobStatus}`);
            console.log(`companyWebsite ${companyWebsite}`);
            console.log(`trackingSite ${trackingSite}`);
            console.log(`notes ${notes}`);
            console.log(`deadline ${deadline}`);

            JobDataService.updateJob(packedData)
                .then(response => {
                    console.log(response.data);
                    navigate("/jobs/"+params.id)
                })
                .catch(e => {
                    console.log(e.response.data);
                })
        } else {
            JobDataService.createJob(packedData)
                .then(response => {
                    navigate("/dashboard")
                })
                .catch(e => {
                    console.log(e);
                });
        }

    }

    

    const resetJob = () => {
        var packedData = {
            user_id: data.user.googleId,
            job_id: params.id,  // get from the url params (:id)
            company: "",
            position: "",
            jobType: "",
            location: "",
            jobStatus: "",
            companyWebsite: "",
            trackingSite: "",
            notes: "",
            deadline: ""
        }

        if (editing) {
            // Handle case where an exisiting
            // job is being updated
            // only reset frontend (change on backend only happens when user click submit)
            packedData.job_id = params.id
            JobDataService.updateJob(packedData) // udpate in the backend, all params are null except for the job_id
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            // only reset frontend (nothing has been saved yet)
            setCompany("");
            setPosition("");
            setJobType("");
            setLocation("");
            setJobStatus("");
            setCompanyWebsite("");
            setTrackingSite("");
            setNotes("");
            setDeadline("");
        }
    }


    const deleteJob = () => {
        if (editing) {
            var deleteRef = {
                user_id: data.user.googleId,
                jobId : params.id
            }
            JobDataService.deleteJob(deleteRef)
                .then(response => {
                    console.log(response.data);
                    navigate("/dashboard");
                })
                .catch(e => {
                    console.log(e);
                })
        }

    }


    // component to be rendered
    return (
        <Container className='main-container'>
            <Stack direction="horizontal" gap="2" className="mb-4">
		    <h1 className="me-auto text-muted" fontFamily="Arial">{ editing ? "EDIT" : "CREATE" } JOB</h1>
		    </Stack>
            <Form>
                <Form.Group className='mb-3'>
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter company</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        company={ company }
                        onChange={ onChangeCompany }
                        placeholder={ "Company" }
                        defaultValue={ editing ? company : "" } // default as null or the previous data, i set null here, thus we need a job page for single job display
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter position</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        position={ position }
                        onChange={ onChangePosition }
                        placeholder={ "Position"}
                        defaultValue={ editing ? position : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter job type. E.g., Intern, Full-Time</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        jobType={ jobType }
                        onChange={ onChangeJobType }
                        placeholder={ "Job Type" }
                        defaultValue={ editing ? jobType : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter location</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        location={ location }
                        onChange={ onChangeLocation }
                        placeholder={ "Location" }
                        defaultValue={ editing ? location : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter status. Kindly choose from: Interview/Accepted/Pending/Declined</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        jobStatus={ jobStatus }
                        onChange={ onChangeJobStatus }
                        placeholder={ "Status" }
                        defaultValue={ editing ? jobStatus : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter company website</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        companyWebsite={ companyWebsite }
                        onChange={ onChangeCompanyWebsite }
                        placeholder={ "Company Website" }
                        defaultValue={ editing ? companyWebsite : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter tracking website</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        trackingSite={ trackingSite }
                        onChange={ onChangeTrackingSite }
                        placeholder={ "Tracking Site" }
                        defaultValue={ editing ? trackingSite : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please enter notes</span>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        notes={ notes }
                        onChange={ onChangeNotes }
                        placeholder={ "Notes" }
                        defaultValue={ editing ? notes : "" }
                    />
                    <span style={{ color:'green' ,fontSize:'12px' }}>Please choose the deadline date</span>
                    <Form.Control
                        type="date"
                        name="datepic"
                        placeholder="DateRange"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    

                </Form.Group>
                <Button variant='outline-success' onClick={ saveJob }>
                    Submit
                </Button>
                <Button variant='outline-success' onClick={ resetJob }>
                    Reset
                </Button>
                
                { editing &&
                <Button variant='outline-success' onClick={ deleteJob }>
                    Delete
                </Button>}
            </Form>
        </Container>
    )
}

export default AddJob;