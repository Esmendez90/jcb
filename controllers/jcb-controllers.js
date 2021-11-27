const express = require("express");
const router = express.Router();

// Routes
// =========================================================
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/rentals", function (req, res) {
  res.render("rentals");
});

router.get("/forsale", function (req, res) {
  res.render("forsale");
});

module.exports = router;
