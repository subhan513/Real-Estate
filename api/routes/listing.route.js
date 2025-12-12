import express from "express";
import { CreateListing, deleteListing } from "../controllers/listing.controller.js";
import {VerifyUser} from "../utils/VerifyToken.js"
const router = express.Router();

router.post('/create',VerifyUser,CreateListing)
router.delete('/listings/:id',VerifyUser,deleteListing)

export default router;