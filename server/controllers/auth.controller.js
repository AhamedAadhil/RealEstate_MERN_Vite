import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

/* REGISTER */
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcryptjs.genSalt();
  const hashedPassword = bcryptjs.hashSync(password, salt); //(hashSync)=>we dont need to use await here it will wait till hashing
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created!" });
  } catch (error) {
    next(error);
  }
};

/* LOGIN */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not Found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }
    const token = await jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc; //this will stop return password in response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

/* GOOGLE AUTH */
export const google = async (req, res, next) => {
  let username = req.body.name;

  if (username && username.includes(" ")) {
    // If the username has spaces, remove them and convert to lowercase
    username = username.replace(/\s+/g, "").toLowerCase();
  } else {
    // If no spaces or username is not provided, use the original username
    username = username; // Use the original username or an empty string
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const genPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(genPassword, 10);
      const newUser = new User({
        username: username + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

/* SIGNOUT USER */
export const signOutUser = async (req, res, next) => {
  try {
    res.clearCookie("access-token");
    res.status(200).json("User Signout Successfully!");
  } catch (error) {
    next(error);
  }
};
