const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error, log } = require("console");
require("dotenv").config();

app.use(express.json());
app.use(cors());

//Data connection with mongodb
mongoose
  .connect(process.env.MongoAtlasDBUrl)
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
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating api for deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    suceess: true,
    name: req.body.name,
  });
});

//creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//schema creating for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating endpoint for registering user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email id.",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Email not registered. Please sign up first" });
  }
});

//creating endpoint for new collection data
app.get("/newcollections",async(req,res)=>
{
  let products=await Product.find({});
  let newcollection=products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection);
})

//Popular in all category
app.get("/popularinallcategory",async(req,res)=>
{ try {
    // Fetch products by category
    let menProducts = await Product.find({ category: "men" }).skip(8).limit(4);
    let womenProducts = await Product.find({ category: "women" }).limit(4);
    let kidsProducts = await Product.find({ category: "kid" }).limit(4);

    // Combine response
    let popularProducts = {
      men: menProducts,
      women: womenProducts,
      kid: kidsProducts,
    };

    console.log("Popular in all categories fetched");
    res.send(popularProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }

})

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port:" + port);
  } else {
    console.log("Error" + error); 
  }
});
