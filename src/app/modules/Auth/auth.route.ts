import express from "express";
import { authControllers } from "./auth.controller";
import { authServices } from "./auth.service";
import { userValidations } from "../user/user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { userLoginValidation } from "./auth.validation";



const router = express.Router();

router.post("/signup",validateRequest(userValidations.createUserValidation),authControllers.userSignup);
router.post("/login",validateRequest(userLoginValidation),authControllers.userLogin);



export const authRouters = router;