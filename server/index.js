require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { runInNewContext } = require('vm');
const { type } = require('os');
const { error } = require('console');
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
   
    // Generate product id
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else {
        id=1;
    }

    const product = new Product({
        id: id,
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

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Product removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema for users
const Users = mongoose.model("Users",{
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    cartData:{
        type:Object,
    }
})

app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,error:"User already exists."});
    }

    let cart = {};
    for (let i=1;i<=300;i++) {
        cart[i] = 0;
    }

    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    console.log("User saved");

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data,process.env.JWT_SECRET);
    res.json({success:true,token});
})

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (!user) {
        return res.status(400).json({success:false,error:"Email not registered."});
    }
    const passCompare = req.body.password === user.password;
    if (!passCompare) {
        return res.status(400).json({success:false,error:"Wrong password."});
    }
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data,process.env.JWT_SECRET);
    res.json({success:true,token});
})

app.get('/newcollection',async(req,res)=>{
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newCollection);
})

app.get('/popularitems',async(req,res)=>{
    let products = await Product.find({}); // {category:"women"}
    let popularItems = products.slice(0,4);
    console.log("Popular Items Fetched");
    res.send(popularItems);
})


app.listen(PORT,(error)=> {
    if (!error) {
        console.log("Server Running on Port "+PORT)
    }
    else {
        console.log("Error: "+error)
    }
})