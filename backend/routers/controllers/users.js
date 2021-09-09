const User = require("../../db/models/user");

const register = (req, res) => {
    const { firstName, email, password } = req.body;
    const user = new User({
      firstName,
      email,
      password
    });
  
    user
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `User Created Successfully`,
          User: result,
        });
      })
      .catch((err) => {
        if (err.keyPattern) {             // <---- what is this ?
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        }
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err,
        });
      });
  };




const getUserById = (req, res) => { 


}


module.exports={getUserById,register};