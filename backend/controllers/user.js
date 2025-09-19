
const User = require("../models/user");

async function handlerUserSignup(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name, 
        email, 
        password,
    });
    // return res.render("home");
    return res.render("home", { id: "12345" });

}

module.exports = {handlerUserSignup};