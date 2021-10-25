const express = require("express");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const usersRoute = express.Router();
const generateToken=require('../utils/generateToken');
//register
usersRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error("user exists");
    }
    const userCreated = await User.create({ email, name, password });
    res.json({
      _id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
      email: userCreated.password,
      token:generateToken(userCreated._id),  
    });
  })
);

//login
usersRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatch(password))) {
      //set status code
      res.status(200);
      res.json({
        _id: user.id,
        name: user.name,
        password: user.password,
        email: user.password,
        token:generateToken(user._id),  
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

//update user
usersRoute.put("/update", (req, res) => {
  res.send("Update Route");
});

//Delete User
usersRoute.delete("/:id", (req, res) => {
  res.send("Delete route");
});

//fetch users
usersRoute.get("/", (req, res) => {
  res.send("Fetch users");
});

module.exports = usersRoute;
