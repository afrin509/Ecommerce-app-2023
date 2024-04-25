import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

import sendEmail from "../client/src/comopnents/utils/email/sendEmail.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log("dirname", __dirname);
const viewsPath = path.join(__dirname, "../views");
console.log("viewsPath", viewsPath);
import express from "express";
const app = express();
app.set("view engine", "hbs");
app.set("views", "viewsPath");
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    if (!name) {
      res.send({ error: "Name is required!!!" });
    }
    if (!email) {
      res.send({ error: "email is required!!!" });
    }
    if (!password) {
      res.send({ error: "password is required" });
    }
    if (!phone) {
      res.send({ error: "phone is required" });
    }
    if (!address) {
      res.send({ error: "address is required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Email is already Registered",
      });
    }
    console.log("hello inside register controller");
    //register user
    const hashedPassword = await hashPassword(password);
    console.log("process.env.JWT_TOKEN", process.env.JWT_SECRET);

    const token = jwt.sign(
      { email, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      {
        algorithm: "HS256",
      }
    );

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      token,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully!!!!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "err in registration",
      error,
    });
  }
};
// to login to existing registered user
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send("Password or Email  is required");
  } else {
    try {
      const allUsers = await userModel.find({});
      console.log("allusers", allUsers);
      const userFound = await userModel.findOne({ email });
      console.log("userFound", userFound);
      if (!userFound) {
        return res.status(404).send("User is not registered");
      }
      const isMatch = comparePassword(password, userFound.password);
      userFound.token = jwt.sign(
        { email, role: userFound.role, _id: userFound._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        {
          algorithm: "HS256",
        }
      );
      userFound.save();
      console.log("isMatch", isMatch);
      if (!isMatch) {
        return res.status(404).send({ message: "Password is incorrect" });
      } else {
        return res
          .status(200)
          .send({ message: "User Logged In Successfully", user: userFound });
      }
    } catch (err) {
      return res.status(500).send({ message: "Error Occured", error: err });
    }
  }
};
// to test the loggedin user
export const testController = async (req, res) => {
  console.log(req.user);
  res.status(200).send({ message: `protected user: ${req.user}` });
};
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).send("User is not registered");
  }
  console.log("user", user);
  const token = jwt.sign(
    { email, role: user.role, _id: user._id },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
    }
  );

  const link = `http://localhost:8080/api/v1/auth/passwordReset/${user._id}/${token}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: user.name, link: link },
    "/template/requestPassword.hbs"
  );
  return res.status(200).send(link);
};
export const resetPasswordController = async (req, res) => {
  // console.log("req", req);
  const { id, token } = req.params;

  const oldUser = await userModel.findOne({ _id: id });
  if (!oldUser) {
    return res.json("User does not exists");
  }
  console.log("oldUser", oldUser);
  const secret = oldUser.password;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken", decodedToken.email);
    if (decodedToken.email === oldUser.email) {
      res.render("index.hbs", {
        id,
        token,
        email: decodedToken.email,
        status: "Not verified",
      });
    }
  } catch (err) {
    console.log("err inside resetPassword", err);
    res.send(err);
  }
};

export const resetPasswordController1 = async (req, res) => {
  const { id } = req.params;
  console.log("req", req.body);
  let { password, confirmPassword } = req.body;
  console.log("password", password, "confirm-password", confirmPassword);
  const oldUser = await userModel.findOne({ _id: id });
  console.log("oldUser in resetPassword 1", oldUser);
  if (!oldUser) {
    return res.json("User does not exists");
  }
  if (confirmPassword !== password) {
    console.log("Passwords did not match");
    return res.json("Passwords did not match");
  }
  const secret = oldUser.password;
  try {
    const hash = await hashPassword(password);
    await oldUser.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hash,
        },
      }
    );
    return res.render("index.hbs", {
      id: oldUser._id,
      user: oldUser,
      token: oldUser.token,
      email: oldUser.email,
      status: "verified",
    });
  } catch (err) {
    console.log("err inside resetPassword", err);
    res.send(err);
  }
};
//update prfile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
	console.log('password',	password);	
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
