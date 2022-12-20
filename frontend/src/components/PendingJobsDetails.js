import React from "react";
import { useState, useEffect, useCallback } from 'react';
import JobDataService from "../services/jobs";
import Card from 'react-bootstrap/Card';

const PendingJobsDetails = () => {
	const [pendingJobs, setPendingJobs] = useState([])
	const [numberOfPendingJobs, setNumberOfPendingJobs] = useState([])
	const [mount, setMount] = useState(true);

	useEffect(() => {
		if (mount) {
		JobDataService.getAll()
			.then(response => {
				console.log('Job data has been received!!');
				retrievePendingJobs(response.data.jobs);
			})
			.catch(e => {
				alert('Error retrieving data!!!')
				console.log("Failed at what state: " + e);
			})
		}
		setMount(false);
	})

	const retrievePendingJobs = useCallback((jobs) => {
		var pendingList = []
		for (var i = 0; i < jobs.length; i++) {
			if (jobs[i].jobStatus === "Pending") {
				pendingList.push(jobs[i]);
			}
		}
		setPendingJobs(pendingList);
		setNumberOfPendingJobs(pendingList.length);
		console.log("Pending jobs:" + pendingList);
	})

	const displayPendingJobs = () => {
		if (!pendingJobs.length) {
			console.log('display pending jobs: NONE')
		}
		console.log("Number of pending jobs: " + pendingJobs.length)
		return pendingJobs.map((pendingJob, index) => (
			<div key={index}>
				<Card style={{ width: '20rem' }}>
					{/* <p>Applicant's name: {pendingJob.name}</p> */}
					<p><b>Company:</b> {pendingJob.company}</p>
					<p><b>Position:</b> {pendingJob.position}</p>
					<p><b>Location:</b> {pendingJob.location}</p>
				</Card>
			</div>
		));
	}

	return (
		<div>
			<h3>Number of pending jobs: {numberOfPendingJobs}</h3>
			{displayPendingJobs()}
		</div>
	)
}


export default PendingJobsDetails;