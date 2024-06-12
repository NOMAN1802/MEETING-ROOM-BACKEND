import express from "express";
import { authControllers } from "./auth.controller";
import { authServices } from "./auth.service";



const router = express.Router();

router.post("/signup", authControllers.userSignup);
router.post("/login", authControllers.userLogin);



export const authRouters = router;