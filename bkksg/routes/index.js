const express = require("express");
const router = express.Router();
const db = require("../lib/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  db.query(`SELECT * FROM author`, (error, authors) => {
    if (error) {
      throw error;
    }
    console.log(authors[0].userId);
    res.render("index", { title: authors[0].userId });
  });
});

module.exports = router;
