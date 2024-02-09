const express = require("express");
const {loginController, signupController, profileController} = require("../controllers");
const {verifyToken} = require("../middleware");
const router= express.Router();

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/profile', verifyToken , profileController)


module.exports= router;

