const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Data connection with MongoDB
mongoose
  .connect(process.env.MongoAtlasDBUrl)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// API creation
app.get("/", (req, res) => {
  res.send("Rahul Rouchan Gogoi's ShopSphere App is running 🚀");
});

// Cloudinary configuration using CLOUDINARY_URL
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL.split("@")[1],
  api_key: process.env.CLOUDINARY_URL.split(":")[1].split("/")[0],
  api_secret: process.env.CLOUDINARY_URL.split(":")[2].split("@")[0],
});

// Multer + Cloudinary storage for image uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ShopSphere_Products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => `product_${Date.now()}`,
  },
});
const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    image_url: req.file.path, // Cloudinary URL
  });
});

// Product Schema
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Add product endpoint
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
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
  res.json({ success: true, name: req.body.name });
});

// Delete product endpoint
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ suceess: true, name: req.body.name });
});

// Get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

// User Schema
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

// Signup endpoint
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

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// Login endpoint
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({
      success: false,
      errors: "Email not registered. Please sign up first",
    });
  }
});

// New collection endpoint
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection);
});

// Popular in all category
app.get("/popularinallcategory", async (req, res) => {
  try {
    let menProducts = await Product.find({ category: "men" }).skip(8).limit(4);
    let womenProducts = await Product.find({ category: "women" }).limit(4);
    let kidsProducts = await Product.find({ category: "kid" }).limit(4);

    let popularProducts = { men: menProducts, women: womenProducts, kid: kidsProducts };
    console.log("Popular in all categories fetched");
    res.send(popularProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

// Cart endpoints
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Related products API
app.get("/relatedproducts/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).limit(4);
    res.send(products);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Checkout API
app.post("/checkout", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    let newCart = {};
    for (let i = 0; i < 300; i++) newCart[i] = 0;

    userData.cartData = newCart;
    await userData.save();

    res.json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ success: false, message: "Checkout failed" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port:" + port);
  } else {
    console.log("Error" + error);
  }
});
