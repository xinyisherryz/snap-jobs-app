import React, { useState, useEffect, useCallback } from 'react';
import JobDataService from "../services/jobs";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Stack } from 'react-bootstrap';


const JobList = ( user ) => {

  const [jobs, setJobs] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [searchJobType, setSearchJobType] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchJobStatus, setSearchJobStatus] = useState("");
  const [locations, setLocations] = useState(["All Locations"]);
  const [jobStatus, setJobStatus] = useState(["All Status"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  /**
   * useCallback to define functions which should only be created
   * once and will be dependencies for useEffect
   */
  const retrieveJobStatus = useCallback(() => {
    JobDataService.getJobStatus()
      .then(response => {
        console.log(`status response data, ${response.data}`)
        setJobStatus(["All Status"].concat(response.data))
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  const retrieveLocations = useCallback(() => {
    JobDataService.getLocation()
      .then(response => {
        console.log(`status response data, ${response.data}`)
        setLocations(["All Locations"].concat(response.data))
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  // Retrieves a list of jobs from the JobDataService
  // dependency: user, current page (21 jobs)
  const retrieveJobs = useCallback(() => {
    setCurrentSearchMode("");
    JobDataService.getAll(currentPage)
      .then(response => {
        setJobs(response.data.jobs);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch(e => {
        console.log(e);
      });
  }, [currentPage]);

  const find = useCallback((query, by) => {
    JobDataService.find(query, by, currentPage)
      .then(response => {
        setJobs(response.data.jobs);
      })
      .catch(e => {
        console.log(e);
      });
  }, [currentPage])

  const findByCompany = useCallback(() => {
    setCurrentSearchMode("findByCompany");
    find(searchCompany, "company");
  }, [find, searchCompany]);

  const findByPosition = useCallback(() => {
    setCurrentSearchMode("findByPosition");
    find(searchPosition, "position");
  }, [find, searchPosition]);

  const findByJobType = useCallback(() => {
    setCurrentSearchMode("findByJobType");
    find(searchJobType, "jobType");
  }, [find, searchJobType]);

  const findByLocation = useCallback(() => {
    if (searchLocation === "All Location") {
      retrieveJobs();
    } else {
      find(searchLocation, "location"); // change location to filter too
    }
  }, [find, searchLocation, retrieveJobs]);

  const findByJobStatus = useCallback(() => {
    setCurrentSearchMode("findByJobStatus");
    if (searchJobStatus === "All Status") {
      retrieveJobs();
    } else {
      find(searchJobStatus, "jobStatus");
    }
  }, [find, searchJobStatus, retrieveJobs]);

  const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByCompany") {
      findByCompany();
    } else if (currentSearchMode === "findByPosition") {
      findByPosition();
    } else if (currentSearchMode === "findByJobType") {
      findByJobType();
    } else if (currentSearchMode === "findByLocation") {
      findByLocation();
    } else if (currentSearchMode === "findByJobStatus") {
      findByJobStatus();
    } else {
      retrieveJobs();
    }
  }, [currentSearchMode, findByCompany, findByPosition, findByJobType, findByLocation, findByJobStatus]);

  // useEffect to carry out side effect functionality
  // retrieve all job status: happens only once and never changes
  useEffect(() => {
    retrieveJobStatus();
  }, [retrieveJobStatus]);

  useEffect(() => {
    retrieveLocations();
  }, [retrieveLocations]);

  // set current page to 0 if search mode changes
  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  // retrieve the next page if current page value changes
  useEffect(() => {
    retrieveNextPage();
  }, [currentPage, retrieveNextPage]);

  // other functions that are not depended on by useEffect
  // triggered by form control events, when the search field changes
  const onChangeSearchCompany = e => {
    const searchCompany = e.target.value;
    setSearchCompany(searchCompany);
  }

  const onChangeSearchPosition = e => {
    const searchPosition = e.target.value;
    setSearchPosition(searchPosition);
  }

  const onChangeSearchJobType = e => {
    const searchJobType = e.target.value;
    setSearchJobType(searchJobType);
  }

  const onChangeSearchLocation = e => {
    const searchLocation = e.target.value;
    setSearchLocation(searchLocation);
  }

  const onChangeSearchJobStatus = e => {
    const searchJobStatus = e.target.value;
    setSearchJobStatus(searchJobStatus);
  }

  return (
    <div className="App">
      <Container className="main-container">
      <Stack direction="horizontal" gap="2" className="mb-4">
		    <h1 className="me-auto text-muted" fontFamily="Arial">SEARCH</h1>
		    </Stack>
        <Form>
          <Row>
            <Col>
            <Form.Group className="mb-3">
              <Form.Control
              type="text"
              placeholder="Search by company"
              value={searchCompany}
              onChange={onChangeSearchCompany}
              />
              </Form.Group>
              <Button
                variant="outline-success"
                type="button"
                onClick={findByCompany}
              >
                Search
              </Button>
            </Col>
            <Col>
            <Form.Group className="mb-3">
              <Form.Control
              type="text"
              placeholder="Search by position"
              value={searchPosition}
              onChange={onChangeSearchPosition}
              />
              </Form.Group>
              <Button
                variant="outline-success"
                type="button"
                onClick={findByPosition}
              >
                Search
              </Button>
            </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control
              type="text"
              placeholder="Search by job type"
              value={searchJobType}
              onChange={onChangeSearchJobType}
              />
              </Form.Group>
              <Button
                variant="outline-success"
                type="button"
                onClick={findByJobType}
              >
                Search
              </Button>
            </Col>
            <Col>
            <Form.Group className="mb-3">
              <Form.Control
              as="select"
              onChange={onChangeSearchLocation}
              >
                { locations.map((loc, i) => {
                  return (
                    <option value={loc}
                    key={i}>
                    {loc}
                    </option>
                  )
                })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="outline-success"
                type="button"
                onClick={findByLocation}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  as="select"
                  onChange={onChangeSearchJobStatus}
                >
                  { jobStatus.map((jobS, i) => {
                    return (
                      <option value={jobS}
                      key={i}>
                        {jobS}
                      </option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="outline-success"
                type="button"
                onClick={findByJobStatus}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="jobRow">
          { jobs.map((job) => {
            if (user && user.user.googleId === job.user_id) {
              return (
                <Col key={job._id}>
                  <Card classname="jobListCard">
                    <Card.Body>
                      <Card.Title> {job.position} </Card.Title>
                      <Card.Text>
                        Company: {job.company}
                      </Card.Text>
                      <Card.Text>
                        Location: {job.location}
                      </Card.Text>
                      <Card.Text>
                        Status: {job.jobStatus}
                      </Card.Text>
                      <Card.Link href={"/jobs/"+job._id}>
                        View Job
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
            }

          })}
        </Row>
        <br />
        Showing page: { currentPage + 1 }.
        <Button
          variant="link"
          onClick={() => { setCurrentPage(currentPage + 1)} }
        >
          Get next { entriesPerPage } results
        </Button>
      </Container>
    </div>
  )
}


export default JobList;