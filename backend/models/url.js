const mongoose=require("mongoose");
//shema 
const urlSchema=new mongoose.Schema({
    shortId: {
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl: {
        type:String,
        required:true,
    },
    visitHistory: [{timestamp:{ type:Number}}],
  },
    { timestamps:true }
);
// model 
// const URL=mongoose.model("url",urlSchema);
// ✅ Fix: check if already compiled
const URL = mongoose.models.url || mongoose.model("url", urlSchema);

module.exports=URL;