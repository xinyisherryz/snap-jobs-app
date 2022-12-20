# TeamVS-SnapJobs-backend

## 12/14

### Xinyi Zhang

1. Update the filter function for searching jobs based on location
2. Change deadline data type to Date()
3. Correct field name for type to jobType across all the files
4. Organize useless files and check TODO list to finialize

## Zeyu Shen

1. Fix saveJob and deleteJob method for both frontend and backend.
2. Fix and smooth the data flows in: JobDataService -> jobs.router -> jobs.controller -> jobsDAO;
3. Fix and smooth the data flows in: JobDataService -> jobs.router -> profiles.controller -> profilesDAO;

## 12/06

### Xinyi Zhang

1. Revise and test HTTP requests for profiles in Insomnia, ensure that methods in controller and DAO work properly
2. Fix the backend API for jobStatus filter to allow users to narrow the search for job applications
3. Work on the text index for find query (in process)

### Zeyu Shen

1. Build the profile's controller and daos
2. Work on google authentication and the user's controller and daos (in process)

![image](https://media.github.khoury.northeastern.edu/user/10363/files/ffd1bb37-45db-4499-9879-1673d7f0f245)
![image](https://media.github.khoury.northeastern.edu/user/10363/files/c93175a5-5747-41ab-9fc6-6045864394a2)
![image](https://media.github.khoury.northeastern.edu/user/10363/files/6e02a78e-b699-44bc-a64f-5956ee3ca1ff)
![image](https://media.github.khoury.northeastern.edu/user/10363/files/8f819d14-c739-4314-9db7-d4c9035c0886)

## 12/02

### Xinyi Zhang

1. Initial setup for the directory and repo structure for SnapJobs backend
2. Implement the environment variables, create routes, controllers, and DAO for jobs, profiles, and users. Implement CRUD operations for jobs and profiles.
3. Test HTTP requests for jobs in Insomnia

![jobs_post](https://media.github.khoury.northeastern.edu/user/10363/files/f24c007b-8eeb-4d6f-a529-d053d15fc891)
![jobs_put](https://media.github.khoury.northeastern.edu/user/10363/files/7c6c510a-cf19-4f5b-8b8f-2180e45cf575)
![jobs_del](https://media.github.khoury.northeastern.edu/user/10363/files/14710b26-cc66-492b-a709-831d217fd44f)
