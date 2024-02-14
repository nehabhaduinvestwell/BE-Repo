const express = require("express");
const {loginController, signupController, profileController, policyController, pdfController} = require("../controllers");
const {verifyToken} = require("../middleware");
const router= express.Router();

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/profile', verifyToken , profileController)
router.get('/getPolicy', policyController)
router.get('/getPdf', pdfController)

module.exports= router;

