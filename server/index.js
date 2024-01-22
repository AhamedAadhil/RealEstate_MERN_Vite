import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

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
