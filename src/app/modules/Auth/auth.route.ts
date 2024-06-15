import express from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userLoginValidation } from "./auth.validation";


const router = express.Router();

router.post("/login",validateRequest(userLoginValidation),authControllers.userLogin);



export const authRouters = router;