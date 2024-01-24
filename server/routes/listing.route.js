import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);

export default router;
