import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(express.json());

/* CONNECT DATABASE */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected!"))
  .catch((error) => console.log(error.message));

/* APP START */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

/* ROUTES */
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

/* ERROR HANDLING MIDDLEWARE */
app.use(errorMiddleware);
