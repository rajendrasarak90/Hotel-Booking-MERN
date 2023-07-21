const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

const PORT = process.env.PORT || 8000;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.BASE_URL,
  })
);
// htQRRflHsHZPkgj4

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
    return res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (res, req) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.send("user found");
    }
  } catch (err) {
    res.send("user not found");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in server");
  }
  console.log("Server is running on port: ", PORT);
});
