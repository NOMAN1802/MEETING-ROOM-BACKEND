import express from 'express';
import { authorized } from '../../middlewares/authenticateUser';
import { USER_ROLE } from '../user/user.constant';
import { slotValidations } from './slot.validation';
import { slotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/',authorized(USER_ROLE.admin),validateRequest(slotValidations.createSlotValidationSchema),slotControllers.createSlots);

router.get('/availability',slotControllers.checkAvailableSlot)

export const slotRoutes = router;



