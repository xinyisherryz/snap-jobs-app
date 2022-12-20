import React from "react";
import { useState, useEffect, useCallback } from 'react';
import JobDataService from "../services/jobs";
import Card from 'react-bootstrap/Card';

const AcceptedJobsDetails = (props) => {
	const [acceptedJobs, setAcceptedJobs] = useState([])
	const [numberOfAcceptedJobs, setNumberOfAcceptedJobs] = useState([])
	const [mount, setMount] = useState(true);

	// Fetching jobs data
	useEffect(() => {
		if (mount){
			JobDataService.getAll()
				.then(response => {
					console.log('Job data has been received!!!');
					retrieveAcceptedJobs(response.data.jobs);
				})
				.catch(e => {
					alert('Error retrieving data!!!')
					console.log("Failed at what state test: " + e);
				})
		}
		setMount(false);
	})

	const retrieveAcceptedJobs = useCallback((jobs) => {
		var acceptedList = []
		for (var i = 0; i < jobs.length; i++) {
			if (jobs[i].jobStatus === "Accepted") {
				acceptedList.push(jobs[i]);
			}
		}
		setAcceptedJobs(acceptedList);
		setNumberOfAcceptedJobs(acceptedList.length);
		console.log("accepted jobs:" + acceptedList);
	})

	const displayAcceptedJobs = () => {
		if(!acceptedJobs.length) { //If no accepted jobs available
			console.log('displayAcceptedJobs: NONE')
		}
		console.log("Number of accepted jobs: "+ acceptedJobs.length)
		return acceptedJobs.map((acceptedJob, index) => (
			<div key={index}>
				<Card style={{width: '20rem'}}>
						{/* <p>Applicant's name: {acceptedJob.name}</p> */}
						<p><b>Company:</b> {acceptedJob.company}</p>
						<p><b>Position:</b> {acceptedJob.position}</p>
						<p><b>Location:</b> {acceptedJob.location}</p>
				</Card>
			</div>
		));
	}
	
	return (
		<div>
			<h3>Number of accepted jobs: {numberOfAcceptedJobs}</h3>
			<p> {props.data} </p>
			{displayAcceptedJobs()}
		</div>
	)
}


export default AcceptedJobsDetails;
