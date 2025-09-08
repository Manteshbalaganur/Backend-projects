const  shortid  = require("shortid");
const URL = require("../models/Url");


async function handleGenerateNewShortURL(req,res) {
        const  body =req.body;
        if(!body.url){
            return res.status(400).json({error:"url is required ..."})
        }
        const shortID= shortid();
        
        await URL.create({
            shortId:shortID,
            redirectUrl:body.url,
            visitHistory: [],

        });
        return res.status(201).json({shortUrl:`http://localhost:3000/${shortID}`});
}

async function handleGetURLAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOne({shortId});
    return res.json({
        totalclicks:entry.visitHistory.length,
        analytics:entry.visitHistory,
    });
}
module.exports={handleGenerateNewShortURL,handleGetURLAnalytics};
