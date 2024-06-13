import express from "express";
import { authControllers } from "./auth.controller";
import { userValidations } from "../user/user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { userLoginValidation } from "./auth.validation";
import { authorized } from "../../middlewares/authenticateUser";
import { USER_ROLE } from "../user/user.constant";



const router = express.Router();

router.post("/signup",validateRequest(userValidations.createUserValidation),authControllers.userSignup);
router.post("/login",validateRequest(userLoginValidation),authControllers.userLogin);



export const authRouters = router;