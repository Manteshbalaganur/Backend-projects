const express = require("express");
const { 
    handleGenerateNewShortURL,
    handleGetURLAnalytics
} = require("../controllers/url");

const router = express.Router();

router.post("/",handleGenerateNewShortURL);

router.get("/analytics/:shortId",handleGetURLAnalytics);

module.exports = router;


