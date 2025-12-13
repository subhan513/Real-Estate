import express from "express";
import { CreateListing, deleteListing, getListing, updateListing, getListings} from "../controllers/listing.controller.js";
import {VerifyUser} from "../utils/VerifyToken.js"
const router = express.Router();

router.post('/create',VerifyUser,CreateListing)
router.delete('/listings/:id',VerifyUser,deleteListing)
router.post('/update/:id',VerifyUser,updateListing)
router.get('/get/:id',getListing)
router.get('/get',getListings)
export default router;