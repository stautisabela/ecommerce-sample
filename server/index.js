require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { runInNewContext } = require('vm');
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

// Schema for products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct',async(req,res)=>{
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('Product saved.');
    res.json({
        success: true,
        name: req.body.name,
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