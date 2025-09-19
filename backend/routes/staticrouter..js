const express = require("express");

const router = express.Router();

// router.get("/",(req,res)=>{
//     return res.render('home');
// })
router.get("/", (req, res) => {
    res.render("home", { id: null }); // Default null, taaki error na aaye
}); 
router.post("/shorten", async (req, res) => {
    const url = req.body.url;
    // suppose yaha tumne DB me store kiya aur shortId mila
    const shortId = "abc123";  

    res.render("home", { id: shortId });
});

router.get("/signup",(req,res)=>{
    return res.render('signup');
});

module.exports=router; 