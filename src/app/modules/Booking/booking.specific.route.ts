import express from 'express';
import { authorized } from '../../middlewares/authenticateUser';
import { USER_ROLE } from '../user/user.constant';
import { bookingControllers } from './booking.controller';



const router = express.Router();

router.get('/',authorized(USER_ROLE.user , USER_ROLE.admin),bookingControllers.getSpecificUserBookings)

export const specificBookingRoutes = router;