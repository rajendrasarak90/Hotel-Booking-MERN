const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const ImageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const User = require("./models/User");
const Places = require("./models/Places");
const { extname } = require("path");

const PORT = process.env.PORT || 8000;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
dotenv.config();
app.use(express.json());
app.use("/assets", express.static(__dirname + "/assets"));
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
    const places = await Places.find({ owner: user._id });
    return res.status(200).cookie("token", token).json({ user, places });
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
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userDoc = await User.findById(user.id);
    const places = await Places.find({ owner: userDoc._id });
    return res.status(200).json({ user: userDoc, places });
  } catch (err) {
    throw err;
  }
});

app.post("/logout", (req, res) => {
  return res.status(200).cookie("token", "").json(true);
});
// console.log(__dirname);

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  // console.log(link);
  const fileName = "photo" + Date.now() + ".jpg";
  await ImageDownloader.image({
    url: link,
    dest: __dirname + "/assets/" + fileName,
  });
  res.json(fileName);
});

const photosMiddleware = multer({ dest: "assets/" });
app.post(
  "/upload-from-device",
  photosMiddleware.array("photos", 100),
  (req, res) => {
    console.log(req.files);
    const dataFiles = req.files;
    const uploadedFiles = [];
    dataFiles.forEach((file) => {
      const { path, originalname } = file;
      const extArray = originalname.split(".");
      const extName = extArray[extArray.length - 1];
      const newPath = "assets\\photo" + Date.now() + "." + extName;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("assets\\", ""));
    });
    return res.json(uploadedFiles);
  }
);

app.post("/places/add", async (req, res) => {
  // const { token } = req.cookies;
  // if (!token) {
  //   return res.json("Not");
  // }
  // const user = jwt.verify(token, process.env.JWT_SECRET);
  // const { title, address, photos, description, perks, extraInfo } = req.body;
  // console.log(req.body);
  try {
    const place = await Places.create(req.body);
    if (place) {
      res.json(place);
    }
  } catch (err) {
    console.log("Error in creating place");
  }
});

app.post("/places", async (req, res) => {
  const { id } = req.body;
  try {
    const places = await Places.find({ owner: id });
    // console.log(id + ", " + places);
    if (places) {
      res.json(places);
    }
  } catch (err) {
    console.log("Error in fetching places");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in server");
  }
  console.log("Server is running on port: ", PORT);
});
