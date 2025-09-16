const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  res.send(`Rahul Rouchan Gogoi's ShopSphere App says hi! 🛒 All systems are green ✅ Ready to shop!<br>Current Server Time: ${new Date().toLocaleString()}`);
});

// Multer for file upload handling
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Upload endpoint (Cloudinary)
app.post("/upload", upload.single("product"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ShopSphere",
    });
    res.json({
      success: 1,
      image_url: result.secure_url,
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ success: 0, error: "Upload failed" });
  }
});

// Mongoose schema for Product
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

// Add Product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  console.log("Product Saved:", product.name);
  res.json({ success: true, name: req.body.name });
});

// Remove Product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Removed:", req.body.name);
  res.json({ success: true, name: req.body.name });
});

// Get All Products
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

// Mongoose schema for Users
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

// Signup
app.post("/signup", async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "Existing user found with same email id." });
  }

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

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

// Login
app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, errors: "Email not registered. Please sign up first" });

  if (req.body.password !== user.password) return res.json({ success: false, errors: "Wrong Password" });

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// New Collections
app.get("/newcollections", async (req, res) => {
  const products = await Product.find({});
  const newcollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection);
});

// Popular in all categories
app.get("/popularinallcategory", async (req, res) => {
  try {
    const menProducts = await Product.find({ category: "men" }).skip(8).limit(4);
    const womenProducts = await Product.find({ category: "women" }).limit(4);
    const kidsProducts = await Product.find({ category: "kid" }).limit(4);
    res.send({ men: menProducts, women: womenProducts, kid: kidsProducts });
    console.log("Popular in all categories fetched");
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ errors: "Please authenticate using valid token" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  }
};

// Cart APIs
app.post("/addtocart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Related products
app.get("/relatedproducts/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).limit(4);
    res.send(products);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Checkout
app.post("/checkout", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    const newCart = {};
    for (let i = 0; i < 300; i++) newCart[i] = 0;
    userData.cartData = newCart;
    await userData.save();
    res.json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ success: false, message: "Checkout failed" });
  }
});

// Start server
app.listen(port, (error) => {
  if (!error) console.log("Server running on Port:" + port);
  else console.log("Error" + error);
});
