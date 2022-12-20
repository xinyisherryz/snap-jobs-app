import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let profiles;

export default class ProfilesDAO {
  static async injectDB(conn) {
    if (profiles) {
      return;
    }
    try {
      profiles = await conn.db(process.env.JOBS_NS)
                    .collection('profiles');
    } catch (e) {
      console.error(`Unable to connect in ProfilesDAO: ${e}`);
    }
  }

  static async getProfileByUser(id) {
    let cursor;
    try {
      console.log(`user_id: ${id}`);
      console.log(id);
      
      cursor = await profiles.find({
        user_id: id
      });

      const profile = await cursor.toArray();
      return profile[0];
    } catch (e) {
      console.error(`Something went wrong in getProfileByUser: ${e}`);
      throw e;
    }
  }


  static async addProfile(user, firstName, lastName, email, 
      location, industry, jobFunction) {
    try {
      const profileDoc = {
        user_id: user._id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        location: location,
        industry: industry,
        jobFunction: jobFunction
      }
      return await profiles.insertOne(profileDoc);
    } catch (e) {
      console.error(`Unable to post profile: ${e}`);
      return { error: e };
    }
  }

  static async updateProfile(userId, firstName, lastName, email, 
    location, industry, jobFunction) {
    try {
      const updateResponse = await profiles.updateOne(
        { user_id: userId },
        { $set: { firstName: firstName,
                  lastName: lastName,
                  email: email,
                  location: location,
                  industry: industry,
                  jobFunction: jobFunction }}
      )
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update profile: ${e}`);
      return { error: e };
    }
    
  }

}