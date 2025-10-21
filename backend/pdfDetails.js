const mongoose = require("mongoose");

const pdfDetailsSchema = new mongoose.Schema(
    {
        pdf:String,
        pdftitle:String,
        video:String,
        videoTitle:String
    },
    {collection:"pdfDetails"}
);
mongoose.model("pdfDetails",pdfDetailsSchema);