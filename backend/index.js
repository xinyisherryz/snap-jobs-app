import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import JobsDAO from './dao/jobsDAO.js';
import ProfilesDAO from './dao/profilesDAO.js';

// top level code for backend app
async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(
    process.env.JOBS_DB_URI
  )
  const port = process.env.PORT || 8000;

  try {
    await client.connect();
    await JobsDAO.injectDB(client);
    await ProfilesDAO.injectDB(client);

    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    })
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);