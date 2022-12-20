// delete review is in Job.js
import React, { useState, useEffect } from "react";
import JobDataService from "../services/jobs";
import { Link, useParams, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Stack } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

// destructuring, match the name of the property
// matching the props object and assign to 'user'
const Job = ({ user }) => {
  let params = useParams();
  // let location = useLocation();

  const [job, setJob] = useState({
    id: null,
    position: "",
    company: "",
    jobType: "",
    location: "",
    jobStatus: "",
    deadline: ""
  });

  useEffect(() => {
    const getJob = id => {
      JobDataService.getJobById(id)
        .then(response => {
          setJob(response.data)
          console.log(response.data)
        }
      )
      .catch(e => {
        console.log(e);
      });
    }
    getJob(params.id)
  }, [params.id]);

  return (
    <div>
      <Container>
      <Stack direction="horizontal" gap="2" className="mb-4">
		    <h1 className="me-auto text-muted" fontFamily="Arial">SINGLE JOB</h1>
		    </Stack>
        <Row>
          <Col>
          <div className="poster">
          <Image
            className="bigPicture"
            src="../images/dashboard.png"
            fluid
          />
          </div>
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{job.position}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {job.company}
                </Card.Text>
                <Card.Text>
                  {job.jobType}
                </Card.Text>
                <Card.Text>
                  {job.location}
                </Card.Text>
                <Card.Text>
                  {job.jobStatus}
                </Card.Text>
                <Card.Text>
                  {job.deadline}
                </Card.Text>
                { user && user.user.googleId === job.user_id &&  // if user is not null, in other words "truthy", JS will evaluate the expression to the right of && ;
                  <Link to={"/jobs/" + params.id + "/edit"}> 
                    Single Job Page
                  </Link>
                }
                  <Card.Link href={"/jobs/" + params.id + "/edit"}> 
                    Edit/Delete
                  </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
          
    </div>
  )
}


export default Job;