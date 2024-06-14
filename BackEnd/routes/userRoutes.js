const express = require("express");
const router = express.Router();

const { generateToken, jwtAuthMiddleware } = require("../jwt");
const userDetail = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userDetail.findOne({ email: email });
    if (existingUser) {
      console.log("user ALready registered");
      return res.status(409).json({ error: "user Already Exists" });
    }
    const newUser = new userDetail({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error in register user:", err);
  }
});
// POST Method to add a new user
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newuser = new userDetail(data);
    const response = await newuser.save();
    console.log("New user saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await userDetail.find();
    console.log("All user fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userDetail.findOne({ email: email });
    if (!existingUser) {
      return res.status(409).json({ error: "user is not Registered!" });
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ error: "Incorrect Password" });
    }
    const payload = {
      email: existingUser.email,
    };

    const token = generateToken(payload);
    return res.json({
      token,
      user: existingUser.name,
      id: existingUser._id,
    });
  } catch (err) {
    console.log("Error:", err);
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    // Send the username and phone number in the response
    res.status(200).json({ message: "user Loggin Kiya Hai" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
