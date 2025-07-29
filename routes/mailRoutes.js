const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mail/mailController");

router.post("/", mailController.createMail);

module.exports = router;
