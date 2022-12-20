import JobsDAO from '../dao/jobsDAO.js';

export default class JobsController {

  static async apiGetJobs(req, res, next) {
    // set page information - plan to have 3 jobs per row
    const jobsPerPage = req.query.jobsPerPage ?
      parseInt(req.query.jobsPerPage) : 21;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    // set filters on company, position, type, location, status, and deadline
    let filters = {}
    if (req.query.company) {
      filters.company = req.query.company;
    } else if (req.query.position) {
      filters.position = req.query.position;
    } else if (req.query.jobType) {
      filters.jobType = req.query.jobType;
    } else if (req.query.location) {
      filters.location = req.query.location;
    } else if (req.query.jobStatus) {
      filters.jobStatus = req.query.jobStatus;
    } else if (req.query.deadline) {
      filters.deadline = req.query.deadline;
    }

    // make the request to JobsDAO
    const { jobsList, totalNumJobs } = await JobsDAO.getJobs({ filters, page, jobsPerPage });

    let response = {
      jobs: jobsList,
      page: page,
      filters: filters,
      entries_per_page: jobsPerPage,
      total_results: totalNumJobs
    };
    res.json(response);
  }

  static async apiGetCompanies(req, res, next) {
    try {
      // let JobsDAO return all distinct company values
      let propertyTypes = await JobsDAO.getCompanies();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetPositions(req, res, next) {
    try {
      // let JobsDAO return all distinct position values
      let propertyTypes = await JobsDAO.getPositions();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetJobTypes(req, res, next) {
    try {
      // let JobsDAO return all distinct type values
      let propertyTypes = await JobsDAO.getJobTypes();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetLocations(req, res, next) {
    try {
      // let JobsDAO return all distinct location values
      let propertyTypes = await JobsDAO.getLocations();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetJobStatus(req, res, next) {
    try {
      // let JobsDAO return all distinct status values
      let propertyTypes = await JobsDAO.getJobStatus();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostJob(req, res, next) {
    try {
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }

      const company = req.body.company;
      const position = req.body.position;
      const jobType = req.body.jobType;
      const location = req.body.location;
      const jobStatus = req.body.jobStatus;
      const notes = req.body.notes;
      const companyWebsite = req.body.companyWebsite;
      const trackingSite = req.body.trackingSite;
      const deadline = req.body.deadline;

      const jobResponse = await JobsDAO.addJob(
        userInfo,
        company,
        position,
        jobType,
        location,
        jobStatus,
        companyWebsite,
        trackingSite,
        notes,
        deadline
      );

      var { error } = jobResponse;
      console.log(error);
      if (error) {
        res.status(500).json({ error: "Unable to post job." });
      } else {
        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateJob(req, res, next) {
    try {
      const userId = req.body.user_id;
      const jobId = req.body.job_id;
      const company = req.body.company;
      const position = req.body.position;
      const jobType = req.body.jobType;
      const location = req.body.location;
      const jobStatus = req.body.jobStatus;
      const notes = req.body.notes;
      const companyWebsite = req.body.companyWebsite;
      const trackingSite = req.body.trackingSite;
      const deadline = req.body.deadline;

      const jobResponse = await JobsDAO.updateJob(
        userId,
        jobId,
        company,
        position,
        jobType,
        location,
        jobStatus,
        companyWebsite,
        trackingSite,
        notes,
        deadline
      )


      var { error } = jobResponse;
      if (error) {
        res.status(500).json({ error });
      }

      if (jobResponse.modifiedCount === 0) {
        throw new Error ("Unable to update job.");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteJob(req, res, next) {
    try {
      console.log(`controller delete userid`);
      console.log(req.body);

      const userId = req.body.user_id;
      const jobId = req.body.jobId;

      const jobResponse = await JobsDAO.deleteJob(
        userId,
        jobId
      );

      var { error } = jobResponse;
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json({ status: "success" });
      }

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetJobById(req, res, next) {
    try {
      let id = req.params.id || {};
      let job = await JobsDAO.getJobById(id);
      if (!job) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(job);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }


}