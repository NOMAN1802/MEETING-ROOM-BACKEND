import express from 'express';
import { roomControllers } from './room.controller';
import validateRequest from '../../middlewares/validateRequest';
import { roomValidations } from './room.validation';
import { authorized } from '../../middlewares/authenticateUser';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/',authorized(USER_ROLE.admin),validateRequest(roomValidations.roomCreateValidationSchema),roomControllers.createRoom);

router.get(
    '/:id',authorized(USER_ROLE.admin, USER_ROLE.user),
    roomControllers.getSingleRoom,
  );


export const roomRoutes = router;