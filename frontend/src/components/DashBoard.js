import React, { useState, useEffect, useCallback } from 'react';
import JobDataService from "../services/jobs";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Stack } from 'react-bootstrap';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AcceptedJobsDetails from './AcceptedJobsDetails';
import PendingJobsDetails from './PendingJobsDetails';
import DeclinedJobsDetails from './DeclinedJobsDetails';
import InterviewsDetails from './InterviewDetails';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const DashBoard = ( {user} ) => {
	const [currentPage, setJobs] = useState([]);
	const [pendingJob, setPendingJobs] = useState([])
	const [acceptedJob, setAcceptedJobs] = useState([])
	const [declinedJob, setDeclinedJobs] = useState([])
	const [interviewScheduled, setInterviewScheduled] = useState([])

	const [numberOfPendingJob, setNumberOfPendingJob] = useState([])
	const [numberOfAcceptedJob, setNumberOfAcceptedJob] = useState([])
	const [numberOfDeclinedJob, setNumberOfDeclinedJob] = useState([])
	const [numberOfInterviewScheduled, setNumberOfInterviewScheduled] = useState([])
	const [hasRender, setRender] = useState(false);
	const [mount, setMount] = useState(true);
  	const onShow = React.useCallback(() => setRender(true), []);//// Handle onClick... Make sure data updated with everytime clicking
	const [monthFreq, setMonthFreq] = useState([]);

	useEffect(() => {
		if (mount) {
			retrieveJobs();
		}
		console.log("Data :  " + pendingJob)
		setMount(false);
	})

	const retrieveJobs = useCallback(() => {
		JobDataService.getAll()
			.then(response => {
				setJobs(response.data.jobs);
				var pendingJob = [];
				var acceptedJob = [];
				var interviewScheduled = [];
				var declinedJob = [];

				if (user) {
					for (var i = 0; i < response.data.jobs.length; i++) {
						if (user.googleId === response.data.jobs[i].user_id) {
							if (response.data.jobs[i].jobStatus === "Accepted") {
								acceptedJob.push(response.data.jobs[i])
							}
							if (response.data.jobs[i].jobStatus === "Pending") {
								pendingJob.push(response.data.jobs[i])
							}
							if (response.data.jobs[i].jobStatus === "Declined") {
								declinedJob.push(response.data.jobs[i])
							}
							if (response.data.jobs[i].jobStatus === "Interview") {
								interviewScheduled.push(response.data.jobs[i])
							}
						}
					}
				}


				setPendingJobs(pendingJob);
				setAcceptedJobs(acceptedJob);
				setDeclinedJobs(declinedJob);
				setInterviewScheduled(interviewScheduled);

				setNumberOfPendingJob(pendingJob.length);
				setNumberOfAcceptedJob(acceptedJob.length);
				setNumberOfDeclinedJob(declinedJob.length);
				setNumberOfInterviewScheduled(interviewScheduled.length);

				console.log("Numbers of accepted jobs: " + acceptedJob.length);
				console.log("Numbers of pending jobs: " + pendingJob.length);
				console.log("Numbers of declined jobs: " + declinedJob.length);
				console.log("Numbers of interviews: " + interviewScheduled.length);
			})
			.catch(e => {
				console.log("Failed at what state: " + e);
			});
	}, [currentPage, pendingJob, acceptedJob, interviewScheduled, declinedJob, numberOfPendingJob, numberOfAcceptedJob, numberOfInterviewScheduled, numberOfDeclinedJob, user]);

	useEffect(() => {
		if (user) {
			retrieveJobs();
		}
	}, [retrieveJobs, user]);


	// ----------- FOR BAR CHART -----------------------------
	useEffect(() => {
		let monthFreq =  new Array(13).fill(0);
		JobDataService.getAll().
			then(response => {
				response.data.jobs.map(item => {
					console.log(item.deadline);
					var splittedDate = item.deadline.split("-")
					console.log(splittedDate); // returns ['2022', '12', '14T00:39:18.577Z']
					// Get month
					monthFreq[splittedDate[1]]+=1
				})
				console.log('month freqency: ' + monthFreq);
				// return [0,0,0,0,0,0,0,0,0,0,3,4,3]
				//		   |
				//      Extra 0
				monthFreq.shift();
				console.log('month freqency after remove 1st item: ' + monthFreq);
				setMonthFreq(monthFreq);
			})
			.catch(e => {
				alert('Error retrieving data!!!')
				console.log("Failed at what state: " + e);
			})
	}, [])

	const data = {
		labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		datasets: [
			{
				label: 'Number of deadlines in each months',
				data: monthFreq,
				backgroundColor: 'ForestGreen',
				borderColor: 'black',
				borderWidth: 1
			}
		]
	}
	const options = {}
	//---------------------------------------------------------------------------------------------------------
	return (
		<Container className="my-4">
			<Stack direction="horizontal" gap="2" className="mb-4">
				<h1 className="me-auto text-muted" fontFamily="Arial">DASHBOARD</h1>
			</Stack>
			<hr width="100%" />
			<div style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
				gap: "1rem",
				alignItem: "flex-start"
			}}>
				<Card>
					<Card.Body>
						<Card.Title>Accepted Jobs</Card.Title>
						<Card.Text> {numberOfAcceptedJob} </Card.Text>
						<a href="/accepted">
							<Button  variant="outline-secondary" onClick={onShow}> Details</Button>
							{hasRender && <AcceptedJobsDetails data={acceptedJob} />}
						</a>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Pending Applications</Card.Title>
						<Card.Text> {numberOfPendingJob} </Card.Text>
						<a href="/pending">
							<Button variant="outline-secondary" onClick={onShow}>Details</Button>
							{hasRender && <PendingJobsDetails />}
						</a>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Interviewing Scheduled</Card.Title>
						<Card.Text> {numberOfInterviewScheduled}</Card.Text>
						<a href="/interview">
							<Button variant="outline-secondary" onClick={onShow}>Details</Button>
							{hasRender && <InterviewsDetails />}
						</a>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Declined Applications</Card.Title>
						<Card.Text> {numberOfDeclinedJob}</Card.Text>
						<a href="/declined">
							<Button variant="outline-secondary" onClick={onShow}>Details</Button>
							{hasRender && <DeclinedJobsDetails />}
						</a>
					</Card.Body>
				</Card>
			</div>
			<Stack>
				<hr width="100%" />
				<h2 align="center">Application deadlines in each month</h2>
				<div className="bar-chart" align="center">
					<Bar style={{ padding: '10px', width: '60%' }}
						data={data}
						options={options}
					></Bar>
				</div>
			</Stack>
		</Container>
	)

}

export default DashBoard;