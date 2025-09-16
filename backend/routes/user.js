const express = require("express");

const router= express.Router();

const {handlerUserSignup}=require("../controllers/user");

router.post("/",handlerUserSignup);



module.exports=router;