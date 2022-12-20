
import axios from "axios";

class JobDataService {

  // get all the jobs
  // can be used for: 
  // 1. dashboard (numbers can be counted based on jobs list)
  // 2. Search jobs (default display)

  getAll(page=0) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs?page=${page}`);
  }

  find(query, by="company", page=0) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs?${by}=${query}&page=${page}`
    );
  }

  find(query, by="position", page=0) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs?${by}=${query}&page=${page}`
    );
  }

  find(query, by="jobType", page=0) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs?${by}=${query}&page=${page}`
    );
  }

  getLocation() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/location`);
  }

  getJobStatus() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/jobStatus`);
  }

  // create, update, delete job
  createJob(data) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/job`, data);
  }

  updateJob(data) {
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/job`, data);
  }

  deleteJob(data) {
    console.log("delete data");
    console.log(data);
    return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/job`, { data });
  }

  // update profile
  updateProfile(data) {
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/profile`, data);
  }

  // post profile
  postProfile(data) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/profile`, data);
  }

  getJobById(id) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/id/${id}`);
  }

  getUserById(user_id) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/user_id/${user_id}`)
  }
  
  getProfileById(user_id) {
    console.log(user_id);
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobs/profile/user_id/${user_id}`)
  }

}

export default new JobDataService();