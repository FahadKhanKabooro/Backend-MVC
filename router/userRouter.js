const express = require("express");
const router = express.Router();
const userValidate = require("../Validator/validateUser");
const userController = require("../controller/userControler");

router.post("/signup", userController.userCreate);
router.post("/verify-otp", userController.verifyOtp);

router.post("/signin", userController.signup);
// router.post("/signin", userController.signup);

// router.post("/signIn", (req, res) => {
//   console.log("router is ok");
//   res.send("SIGNin API WORKS FINE");
// });

module.exports = router;
