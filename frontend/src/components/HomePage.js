import React from 'react';
import { Stack, Col, Row, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import ContactForm from './ContactForm';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
} from "mdb-react-ui-kit";


export const HomePage = (props) => {

	return (
		<Stack gap={2}>
			<hr width="100%" />
			<div className="banner shadow-sm p-3 mb-5 bg-body rounded">
				<Stack direction="horizontal" gap={7}>
					<Col className="description" sm={6}>
						<h1><b>SnapJobs bring <font color='green'>easier management</font> to job search</b></h1>
						<h5 class="text-secondary">
							Get more insights into your applications,keep track of personal progress, 
							and share knowledge with the community. All in one place.
						</h5>
					</Col>
					<Col className="carousel" sm={6}>
						<center>
							<Carousel>
								<Carousel.Item>
									<img
										className="d-block w-100"
										src="./images/first_slide.jpeg"
										alt="First slide"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="d-block w-100"
										src="./images/second_slide.jpeg"
										alt="Second slide"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="d-block w-100"
										src="./images/third_slide.jpeg"
										alt="Third slide"
									/>
								</Carousel.Item>
							</Carousel>
						</center>
					</Col>
				</Stack>
			</div>

			<div className="how-it-works shadow-sm p-3 mb-5 bg-white rounded">
				<Container>
					<Row>
						<h3 className="text-dark text-center">How <b>It Works</b></h3>
					</Row>
					<Row>
							<Col align="center">
								<img src="./images/information-button.png" />
								<div><b>Update Profile</b></div>
								Update your information, desired industry and job function
							</Col>
							<Col align="center">
								<img src="./images/add_sign.png" />
								<div><b>Add</b></div>
								Add all of your ongoing job, internship applications
							</Col>
							<Col align="center">
								<img src="./images/track_sign.png" />
								<div><b>Track</b></div>
								Track the timelines, progress of other applications and monitor any interviews or offers received.
							</Col>
							<Col align="center">
								<img src="./images/organize_sign.png" />
								<div><b>Organize</b></div>
								Organize and update all your ongoing applications.
							</Col>
						</Row>
			</Container>
			</div>

			<div className="Testimonials shadow-sm p-3 mb-5 bg-white rounded">
				<MDBContainer className="py-5">
					<MDBRow className="d-flex justify-content-center">
						<MDBCol md="10" xl="8" className="text-center">
							<h3 className="mb-4">What our users are saying about us?</h3>
						</MDBCol>
					</MDBRow>
					<MDBRow className="text-center">
						<MDBCol md="4" className="mb-5 mb-md-0">
							<div className="d-flex justify-content-center mb-4">
								<img
									src="./images/reviewer1.jpeg"
									className="rounded-circle shadow-1-strong"
									width="150"
									height="150"
								/>
							</div>
							<h4 className="mb-3">Pumpkin - Google</h4>
							<h5 class="text-success">Web Developer</h5>
							<p className="px-xl-3">
								<MDBIcon fas icon="quote-left" className="pe-2" />
								“It’s always really hard to find lots of interview questions for quant interviews and SnapJobs has so many, from math, probability, stats, brain-teasers to coding. It’s really comprehensive and so worth the money for the variety of questions and new stuff added all the time.”
							</p>
						</MDBCol>

						<MDBCol md="4" className="mb-5 mb-md-0">
							<div className="d-flex justify-content-center mb-4">
								<img
									src="./images/reviewer2.jpeg"
									className="rounded-circle shadow-1-strong"
									width="150"
									height="150"
								/>
							</div>
							<h4 className="mb-3">Boba - Saleforce</h4>
							<h5 class="text-success">Software Engineer</h5>
							<p className="px-xl-3">
								<MDBIcon fas icon="quote-left" className="pe-2" />
								“As someone who likes to be organized, SnapJobs offers a great option to search and filter for different questions. I also find that I can fill the gaps in the areas where I need more practice. I really benefited from it when interviewing for internships.”
							</p>
						</MDBCol>
						<MDBCol md="4" className="mb-5 mb-md-0">
							<div className="d-flex justify-content-center mb-4">
								<img
									src="./images/reviewer3.jpeg"
									className="rounded-circle shadow-1-strong"
									width="150"
									height="150"
								/>
							</div>
							<h4 className="mb-3">Pancake - Amazon</h4>
							<h5 class="text-success">Marketing Specialist</h5>
							<p className="px-xl-3">
								<MDBIcon fas icon="quote-left" className="pe-2" />
								“When interviewing for internships, I used SnapJobs to see which companies asked what kinds of questions and level of difficulties. The interview question bank was instrumental in getting my internship at Amazon.”
							</p>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</div>

			{/* CONTACT AND INFO SECTION */}
			<div className="contact">
				<Row>
					<Col className="contact-form" sm={4}>
						<h3>Contact form </h3>
						< ContactForm />
					</Col>
					<Col className="map" sm={4}>
					</Col>
					<Col className="info" sm={4}>
						<h3>Our contact information</h3>
						<div>
							<ul class="list-unstyled">
								<li><h6>Address: Seattle, WA 98027</h6></li>
								<li><h6>Phone: + 01 234 567 89</h6></li>
								<li><h6>Email: contact@snapjob.com</h6>
								</li>
							</ul>
						</div>
					</Col>
				</Row>
			</div>
		</Stack>

	)
}