import ProfilesDAO from '../dao/profilesDAO.js'; // correct the path

export default class ProfilesController {

  static async apiGetProfileByUser(req, res, next) {
    try {
      console.log(`req in controller:`);
      console.log(req.params.user_id)

      let id = req.params.user_id || {} ;
      console.log(id);

      let profile = await ProfilesDAO.getProfileByUser(id);
      if (!profile) {
        res.status(404).json({ error: "not found la" });
        return;
      }
      res.json(profile);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostProfile(req, res, next) {
    try {
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }

      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const location = req.body.location;
      const industry = req.body.industry;
      const jobFunction = req.body.jobFunction;

      const profileResponse = await ProfilesDAO.addProfile(
        userInfo,
        firstName,
        lastName,
        email,
        location,
        industry,
        jobFunction
      );

      var { error } = profileResponse;
      console.log(error);
      if (error) {
        res.status(500).json({ error: "Unable to post profile." });
      } else {
        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateProfile(req, res, next) {
    try {
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const userId = req.body.user_id;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const location = req.body.location;
      const industry = req.body.industry;
      const jobFunction = req.body.jobFunction;

      const profileResponse = await ProfilesDAO.updateProfile(
        userId,
        firstName,
        lastName,
        email,
        location,
        industry,
        jobFunction
      )

      var { error } = profileResponse;
      if (error) {
        res.status(500).json({ error });
      }

      if (profileResponse.modifiedCount === 0) {
        throw new Error ("Unable to update profile.");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }


}