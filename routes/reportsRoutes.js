const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reports/reportsController");

router.get("/", reportsController.getReports);
router.get("/generalVision", reportsController.getGeneralVision);
router.get("/neighseller", reportsController.getNeighborhoodSeller);
router.get("/getseller", reportsController.getSeller);
router.get("/getview", reportsController.getView);
router.post("/addview", reportsController.addView);

module.exports = router;
