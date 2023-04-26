const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

router.post(
  "/",
  [
    body("name", "Length should be atleast 3").isLength({ min: 3 }),
    body("email", "Not a valid e-mail address").isEmail(),
    body("password", "Length should be atleast 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const JWT_SECRET = "babbu123456";
    const errors = validationResult(req);
    // if errors are not empty ythen show message of error
    if (!errors.isEmpty()) {
      return res.status(400).res.send({ errors: errors.array() });
    }

    // console.log(req.query);
    // check whether the user with same email exists already in the table users in database
    try {
      let myuser = await User.findOne({ email: req.body.email });
      if (myuser) {
        return res
          .status(400)
          .json({ error: "sorry,this email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      myuser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        myuser: { id: myuser.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      return res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Sorry, some error occurred");
    }
  }
);
module.exports = router;
