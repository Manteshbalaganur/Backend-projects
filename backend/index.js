const express = require("express");

const urlRoutes = require("./routes/url");

const connectDB = require("./connect");

const cors = require("cors");

const URL=require("./models/url");

const app = express();
const PORT = 3000;

app.use(cors()); // frontend and backend communication

connectDB("mongodb://localhost:27017/short-url")
.then(()=>{
    console.log("Database connected");
});


app.use(express.json());

app.use("/url",urlRoutes);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp : Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    

    res.redirect(entry.redirectUrl);
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

