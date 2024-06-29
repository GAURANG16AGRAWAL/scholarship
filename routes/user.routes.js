const { Router } = require("express");
const router = Router();
const authController=require("../controllers/auth.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js");

router.get("/", (req, res) => {
  res.redirect("/user/login");
});

router.post("/login", authController.login);
router.post('/register', authController.register);
router.get('/logout',verifyJWT,authController.logout);


module.exports=router;