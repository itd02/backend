const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/auth");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");


router.route("/signin").post(express.json(), validateSignIpRequest, isRequestValidated, signIn);


router.route("/signup").post(express.json(), validateSignUpRequest, isRequestValidated, signUp);


module.exports = router;