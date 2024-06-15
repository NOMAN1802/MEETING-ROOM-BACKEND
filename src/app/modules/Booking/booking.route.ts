import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authorized } from '../../middlewares/authenticateUser';
import { USER_ROLE } from '../user/user.constant';
import { bookingValidation } from './booking.validation';
import { bookingControllers } from './booking.controller';

const router = express.Router();

router.post('/',authorized(USER_ROLE.user),validateRequest(bookingValidation.createBookingValidationSchema),bookingControllers.createBooking);

router.get('/',authorized(USER_ROLE.admin),bookingControllers.getAllBookings)

router.put('/:id', authorized(USER_ROLE.admin),validateRequest(bookingValidation.updateBookingValidationSchema),bookingControllers.updateBooking)

router.delete('/:id', authorized(USER_ROLE.admin),bookingControllers.deleteBooking)


export const bookingRoutes = router;