import {Router} from "express";
import { userDetails } from "../Controllers/UserController.js";
const router = Router();
router.post('/userDetails',userDetails);
router.get('/userDetails',async(req,res)=>{
    res.json('Hello');
});
export default router;
