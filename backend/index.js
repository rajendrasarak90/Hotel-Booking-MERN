const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");

const User = require("./models/User");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8000;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
dotenv.config();
app.use(express.json());
app.use(CookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.BASE_URL,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then((done) => console.log("conected to DB"))
  .catch((err) => console.log("Error in conecting DB", err));

app.get("/", (req, res) => {
  res.send("this is the response");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    return res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User Not Found");
    }
    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(401).send("Invalid Passoword");
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );
    return res.status(200).cookie("token", token).send(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json("Not");
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    const userDoc = await User.findById(user.id);
    return res.json(userDoc);
  } catch (err) {
    throw err;
  }
});

app.post("/logout", (req, res) => {
  return res.status(200).cookie("token", "").json(true);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in server");
  }
  console.log("Server is running on port: ", PORT);
});
