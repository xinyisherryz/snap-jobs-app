import express from 'express';
import cors from 'cors';
import jobs from './api/jobs.route.js';

// create the express app
const app = express();

app.use(cors());
app.use(express.json());

/**
 * set base URL for the API
 * all requests with prefix 'api/v1/jobs'
 * will be sent to jobs.route.js
 */
app.use("/api/v1/jobs", jobs);
app.use('*', (req, res) => {
  res.status(404).json({error: "not found"});
})

export default app;