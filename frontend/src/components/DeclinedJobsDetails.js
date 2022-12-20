import React from "react";
import { useState, useEffect, useCallback } from 'react';
import JobDataService from "../services/jobs";
import Card from 'react-bootstrap/Card';

const DeclinedJobsDetails = () => {
	const [declinedJobs, setDeclinedJobs] = useState([])
	const [numberOfDeclinedJobs, setNumberOfDeclinedJobs] = useState([])
	const [mount, setMount] = useState(true);

	// Fetching jobs data
	useEffect(() => {
		if (mount) {
			JobDataService.getAll()
				.then(response => {
					console.log('Job data has been received!!');
					retrieveDeclinedJobs(response.data.jobs);
				})
				.catch(e => {
					alert('Error retrieving data!!!')
					console.log("Failed at what state: " + e);
				})
		}
		setMount(false);
	})

	const retrieveDeclinedJobs = useCallback((jobs) => {
		var declinedList = []
		for (var i = 0; i < jobs.length; i++) {
			if (jobs[i].jobStatus === "Declined") {
				declinedList.push(jobs[i]);
			}
		}
		setDeclinedJobs(declinedList);
		setNumberOfDeclinedJobs(declinedList.length);
		console.log("declined jobs:" + declinedList);
	})

	const displayDeclinedJobs = () => {
		if (!declinedJobs.length) {
			console.log('display declined jobs: NONE')
		}
		console.log("Number of declined jobs: " + declinedJobs.length)
		return declinedJobs.map((declinedJob, index) => (
			<div key={index}>
				<Card style={{ width: '20rem' }}>
					{/* <p>Applicant's name: {declinedJob.name}</p> */}
					<p><b>Company:</b> {declinedJob.company}</p>
					<p><b>Position:</b> {declinedJob.position}</p>
					<p><b>Location:</b> {declinedJob.location}</p>
				</Card>
			</div>
		));
	}

	return (
		<div>
			<h3>Number of declined jobs: {numberOfDeclinedJobs}</h3>
			{displayDeclinedJobs()}
		</div>
	)
}
export default DeclinedJobsDetails;
