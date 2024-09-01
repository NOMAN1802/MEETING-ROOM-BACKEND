import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { userControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import { authorized } from '../../middlewares/authenticateUser';

const router = express.Router();


router.post("/signup",validateRequest(userValidations.createUserValidation), userControllers.createUser);
router.get("/users", userControllers.getAllUsers);
router.patch("/promote/:id", authorized(USER_ROLE.admin), userControllers.promoteUser);
router.get('/:email', authorized(USER_ROLE.user), userControllers.getUserByEmail);

export const userRouter = router;