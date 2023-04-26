const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  let robj = {
    a: "this",
    message: "Welcome to the auth route",
  };
  res.json(robj);
});
module.exports = router;
