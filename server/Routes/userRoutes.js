const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddleware");

// Register Route

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    // Check if the user already exists
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // password stored in req.body after hashing
    req.body.password = hashedPassword;

    // Create the user
    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.json({ error: error });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User doesn't exist, please register!",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    const token = jwt.sign({ userID: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      user: user,
      message: "User Logged in",
      token: token,
    });
  } catch (error) {
    res.send(error);
  }
});

// token verification

router.get("/get-current-user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userID).select('-password');
  
  res.send({
    success : true,
    message:"User Authorized for Protected Route",
    data : user,
  })

});

module.exports = router;
