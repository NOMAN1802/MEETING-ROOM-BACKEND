import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.route";
import { roomRoutes } from "../modules/Room/room.route";
import { slotRoutes } from "../modules/Slot/slot.route";
import { userRouter } from "../modules/user/user.route";
import { bookingRoutes } from "../modules/Booking/booking.route";
import { specificBookingRoutes } from "../modules/Booking/booking.specific.route";



const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouters
    },
    {
        path: '/auth',
        route: userRouter
    },
    
    {
        path: '/rooms',
        route: roomRoutes
    },
    {
        path: '/slots',
        route: slotRoutes
    },
    {
        path: '/bookings',
        route: bookingRoutes
    },
    {
        path: '/my-bookings',
        route: specificBookingRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;