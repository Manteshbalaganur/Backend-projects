const express = require("express");

require("dotenv").config();

const urlRoutes = require("./routes/url");

const connectDB = require("./connect");

const cors = require("cors");

const  staticRouter  = require("./routes/staticrouter.");

const path = require("path"); // for rendering bultin fun

const URL=require("./models/url");

const app = express();
const PORT = 3000;

app.use(cors()); // frontend and backend communication

connectDB("mongodb://localhost:27017/short-url")
.then(()=>{
    console.log("Database connected");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form support
//server side rendering
app.set("view engine","ejs");

app.set("views", path.resolve("./views"));

app.get("/test",(req,res)=>{
  const allurls=URL.find({});
  return res.render("home");
});

app.use("/",staticRouter);

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

// Connect MongoDB Atlas
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Atlas connected ✅");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("DB connection error ❌", err));
  
// ✅ Local run vs Vercel deploy
if (process.env.NODE_ENV !== "production") {
  connectDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  });
} else {
  // Vercel will call this handler
  connectDB(process.env.MONGO_URL);
}

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

