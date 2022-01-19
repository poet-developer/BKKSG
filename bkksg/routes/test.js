const express = require("express");
const router = express.Router();

router.put("/user", (req, res) => {
  res.send("hello world!");
});

module.exports = router;
