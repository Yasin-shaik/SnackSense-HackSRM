import {Router} from "express";
import { registerUser, registerNutri, loginUser, loginNutri } from "../Controllers/AuthController.js";

const router = Router();
router.post('/registerUser',registerUser);
router.post('/registerNutri',registerNutri);
router.post('/loginUser',loginUser);
router.post('/loginNutri',loginNutri);

export default router;