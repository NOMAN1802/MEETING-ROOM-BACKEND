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

  router.get('/',authorized(USER_ROLE.admin, USER_ROLE.user), roomControllers.getAllRooms);


  router.put(
    '/:id',
    authorized(USER_ROLE.admin),
    validateRequest(
      roomValidations.roomUpdateValidationSchema
    ),
    roomControllers.updateRoom,
  );

  router.delete(
    '/:id',
    authorized(USER_ROLE.admin),
    roomControllers.deleteRoom,
  );


export const roomRoutes = router;