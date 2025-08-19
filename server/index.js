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

app.listen(PORT,(error)=> {
    if (!error) {
        console.log("Server Running on Port "+PORT)
    }
    else {
        console.log("Error: "+error)
    }
})