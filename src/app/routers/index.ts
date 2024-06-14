import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.route";
import { roomRoutes } from "../modules/Room/room.route";
import { slotRoutes } from "../modules/Slot/slot.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouters
    },
    {
        path: '/rooms',
        route: roomRoutes
    },
    {
        path: '/slots',
        route: slotRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;