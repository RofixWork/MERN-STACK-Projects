const express = require("express");
const { login, dashboard } = require("../controllers/user.controllers");
const authenticated = require("../middlewares/auth");
const router = express.Router();

router.route("/dashboard").get(authenticated, dashboard);
router.route("/login").post(login);

module.exports = router;
