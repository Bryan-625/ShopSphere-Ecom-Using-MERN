const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
require("dotenv").config();

app.use(express.json());
app.use(cors());

//Data connection with mongodb
mongoose.connect(process.env.MongoAtlasDBUrl)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);   
  });

//api creation

app.get("/", (req, res) => {
  res.send("Express app is running");
});

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./Upload/Images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload end point for images
app.use("/images", express.static("Upload/Images"));
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//creating schema using mongoose
const Product = mongoose.model("Product", { 
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description:
  {
    type:String,
    require:true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:
  {
    type:Boolean,
    default:true,
  }
});

app.post("/addproduct",async(req,res)=>
{
  let products=await Product.find({});
  let id;
  if(products.length>0)
  {
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id=last_product.id+1;

  }
  else{
    id=1;
  }
  const product=new Product({
    id:id,
    name:req.body.name,
    description:req.body.description,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price

  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success:true,
    name:req.body.name,
  })
})

//creating api for deleting products
app.post("/removeproduct",async(req,res)=>
{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    suceess:true,
    name:req.body.name,
  })
  
})

//creating api for getting all products
app.get("/allproducts",async(req,res)=>
{
  let products=await Product.find({});
  console.log("All products fteched");
  res.send(products);
  
})

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port:" + port);
  } else {
    console.log("Error" + error); 
  }
});
