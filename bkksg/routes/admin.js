const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin", { title: "admin" });
});
router.get("/create", function (req, res, next) {
  res.render("admin", { title: "create" });
});

module.exports = router;
