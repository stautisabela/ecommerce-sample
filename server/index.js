require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI || "";
app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(process.env.DB_URI);

// API creation
app.get("/", (req,res)=>{
    res.send("Express App is running.")
})

// Image storage engine
const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

// Image upload endpoint
app.use('/images',express.static('uploads/images'))
app.post("/uploads",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.listen(PORT,(error)=> {
    if (!error) {
        console.log("Server Running on Port "+PORT)
    }
    else {
        console.log("Error: "+error)
    }
})