import express from 'express';
import JobsController from './jobs.controller.js';
import ProfilesController from './profiles.controller.js';

/**
 * use Express router to handle different requests
 * based on the URL and HTTP methods
 */
const router = express.Router();

router.route("/").get(JobsController.apiGetJobs); 

// for filters
router.route("/company").get(JobsController.apiGetCompanies);
router.route("/position").get(JobsController.apiGetPositions);
router.route("/jobType").get(JobsController.apiGetJobTypes);
router.route("/location").get(JobsController.apiGetLocations);
router.route("/jobStatus").get(JobsController.apiGetJobStatus);

router
  .route("/job")
  .post(JobsController.apiPostJob)
  .put(JobsController.apiUpdateJob)
  .delete(JobsController.apiDeleteJob);

router.route("/id/:id").get(JobsController.apiGetJobById);

router
  .route("/profile")
  .post(ProfilesController.apiPostProfile)
  .put(ProfilesController.apiUpdateProfile);

router.route("/profile/user_id/:user_id").get(ProfilesController.apiGetProfileByUser);



export default router;