import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

/* CONNECT DATABASE */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected!"))
  .catch((error) => console.log(error.message));

const __dirname = path.resolve();

/* APP START */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

/* ROUTES */
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

/* ERROR HANDLING MIDDLEWARE */
app.use(errorMiddleware);
