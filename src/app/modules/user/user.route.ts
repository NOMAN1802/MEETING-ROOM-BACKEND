import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { userControllers } from './user.controller';


const router = express.Router();

router.post("/signup",validateRequest(userValidations.createUserValidation), userControllers.createUser);