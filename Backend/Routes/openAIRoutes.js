import {Router} from "express";
import {generate} from "../Controllers/openAIController.js";

const router=Router();
router.post('/generate',generate);
router.get('/generate',(req,res)=>{
    res.send('Hello');
})

export default router;