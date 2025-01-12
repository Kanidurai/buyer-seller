import { Router } from "express";
import {
    createUser,
    getAllSeller
} from "../controllers/sellerController";

const router = Router();
 
router.post("/seller", createUser);  
//@ts-ignore      
router.get("/getAllSeller", getAllSeller);   

export default router;
