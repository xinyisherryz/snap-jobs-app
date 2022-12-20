import React from "react";
import { useState, useEffect, useCallback } from 'react';
import JobDataService from "../services/jobs";
import Card from 'react-bootstrap/Card';

const InterviewDetails = () => {
	const [interviews, setInterviews] = useState([])
	const [numberOfInterviews, setNumberOfInterviews] = useState([])
	const [mount, setMount] = useState(true);

	// Fetching jobs data
	useEffect(() => {
		JobDataService.getAll()
		if(mount) {
			JobDataService.getAll()
				.then(response => {
					console.log('Job data has been received!!');
					retrieveInterviews(response.data.jobs);
			})
			.catch(e => {
				alert('Error retrieving data!!!')
				console.log("Failed at what state: " + e);
			})
		}
		setMount(false);
	})

	const retrieveInterviews = useCallback((jobs) => {
		var interviewsList = []
		for (var i = 0; i < jobs.length; i++) {
			if (jobs[i].jobStatus === "Interview") {
				interviewsList.push(jobs[i]);
			}
		}
		setInterviews(interviewsList);
		setNumberOfInterviews(interviewsList.length);
		console.log("interviews:" + interviewsList);
	})

	const displayInterviews = () => {
		if (!interviews.length) {
			console.log('display interviews: NONE')
		}
		console.log("Number of interview: " + interviews.length)
		return interviews.map((interview, index) => (
			<div key={index}>
				<Card style={{ width: '20rem' }}>
					{/* <p>Applicant's name: {interview.name}</p> */}
					<p><b>Company:</b> {interview.company}</p>
					<p><b>Position:</b> {interview.position}</p>
                    <p><b>Location:</b> {interview.location}</p>
                    <p><b>Dealine:</b> {interview.deadline}</p>
				</Card>
			</div>
		));
	}

	return (
		<div>
			<h3>Number of interviews: {numberOfInterviews}</h3>
			{displayInterviews()}
		</div>
	)
}
export default InterviewDetails;