import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let jobs;

export default class JobsDAO {
  static async injectDB(conn) {
    if (jobs) {
      return;
    }
    try {
      jobs = await conn.db(process.env.JOBS_NS)
                    .collection('jobs');
    } catch (e) {
      console.error(`Unable to connect in JobsDAO: ${e}`);
    }
  }

  static async getJobs({
    filters = null,
    page = 0,
    jobsPerPage = 21
  } = {}) {
    let query;
    if (filters) {
      if ("company" in filters) {
        query = { $text: { $search: filters['company']}};
      } else if ("position" in filters) {
        query = { $text: {$search: filters['position']}};
      } else if ("jobType" in filters) {
        query = { $text: { $search: filters['jobType']}};
      } else if ("location" in filters) {
        query = { "location": { $eq: filters['location']}}; // changing location to filter too
      } else if ("jobStatus" in filters) {
        query = { "jobStatus": { $eq: filters['jobStatus']}};
      }
    }

    let cursor;
    try {
      cursor = await jobs.find(query)
                         .limit(jobsPerPage)
                         .skip(jobsPerPage * page);
      const jobsList = await cursor.toArray();
      const totalNumJobs = await jobs.countDocuments(query);
      return { jobsList, totalNumJobs };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { jobsList: [], totalNumJobs: 0 };
    }
  }

  static async getCompanies() {
    let companies = [];
    try {
      companies = await jobs.distinct("company");
      return companies;
    } catch (e) {
      console.error(`Unable to get companies, ${e}`);
      return companies;
    }
  }

  static async getPositions() {
    let positions = [];
    try {
      positions = await jobs.distinct("position");
      return positions;
    } catch (e) {
      console.error(`Unable to get positions, ${e}`);
      return positions;
    }
  }

  static async getJobTypes() {
    let jobTypes = [];
    try {
      jobTypes = await jobs.distinct("jobType");
      return jobTypes;
    } catch (e) {
      console.error(`Unable to get jobTypes, ${e}`);
      return jobTypes;
    }
  }

  static async getLocations() {
    let locations = [];
    try {
      locations = await jobs.distinct("location");
      return locations;
    } catch (e) {
      console.error(`Unable to get locations, ${e}`);
      return locations;
    }
  }

  static async getJobStatus() {
    let jobStatus = [];
    try {
      jobStatus = await jobs.distinct("jobStatus");
      return jobStatus;
    } catch (e) {
      console.error(`Unable to get companies, ${e}`);
      return jobStatus;
    }
  }

  static async addJob(user, company, position, jobType, 
      location, jobStatus, companyWebsite, trackingSite, notes, deadline) {
    try {
      const jobDoc = {
        user_id: user._id,
        company: company,
        position: position,
        jobType: jobType,
        location: location,
        jobStatus: jobStatus, // changed the name from status to job status
        deadline: deadline,
        notes: notes,
        companyWebsite: companyWebsite,
        trackingSite: trackingSite
      }
      return await jobs.insertOne(jobDoc);
    } catch (e) {
      console.error(`Unable to post job: ${e}`);
      return { error: e };
    }
  }

  static async updateJob(userId, jobId, company, position, jobType, 
      location, jobStatus, companyWebsite, trackingSite, notes, deadline) {
    try {
      const updateResponse = await jobs.updateOne(
        { 
          _id: ObjectId(jobId),
          user_id: userId
        },
        { $set: { 
                  company: company, 
                  position: position,
                  jobType: jobType, 
                  location: location,
                  jobStatus: jobStatus, 
                  deadline: deadline,
                  companyWebsite: companyWebsite,
                  trackingSite: trackingSite,
                  notes: notes 
                }
        }
      )

      console.log(updateResponse);
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update job: ${e}`);
      return { error: e };
    }
    
  }

  static async deleteJob(userId, jobId) {
    try {
      const deleteResponse = await jobs.deleteOne({
        _id: ObjectId(jobId),
        user_id: userId
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete job: ${e}`);
      return { error: e };
    }
  }

  static async getJobById(id) {
      let cursor;
      try {
        cursor = await jobs.find({
          _id: ObjectId(id)
        });
        const job = await cursor.toArray();
        return job[0];
    } catch (e) {
      console.error(`Something went wrong in getJobById: ${e}`);
      throw e;
    }
  }


}