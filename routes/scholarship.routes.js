const { Router } = require("express");
const router = Router();
const scholarshipController=require("../controllers/scholarship.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js");

router.post("/add", scholarshipController.addScholarship);
router.get("/show", scholarshipController.showAllScholarships);
router.get("/apply/:id", scholarshipController.applyScholarships);
router.get("/showApplied", scholarshipController.showAppliedScholarships);

module.exports=router;