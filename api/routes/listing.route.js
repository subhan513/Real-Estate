import express from "express";
import { CreateListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post('/create',CreateListing)

export default router;