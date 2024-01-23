import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.utils.js";

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
