import express from "express";
import { DeleteUser, getUserListings, logout, test, UpdateProfile ,getUser} from "../controllers/user.controller.js";
import { VerifyUser} from "../utils/VerifyToken.js";

const router = express.Router();
router.get('/test',test)
router.post('/update/:id',VerifyUser,UpdateProfile)
router.delete('/delete/:id',VerifyUser,DeleteUser)
router.get('/logout',logout)
router.get('/listings/:id',VerifyUser,getUserListings)
router.get('/:id',VerifyUser,getUser)
export default router;
