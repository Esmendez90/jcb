const express = require("express");

const router = express.Router();

// Routes
// =========================================================
router.get("/rentals", function (req, res) {
  res.render("rentals");
});

router.get("/forsale", function (req, res) {
  res.render("forsale");
});

router.get("*", function (req, res) {
  res.render("index");
});

module.exports = router;
