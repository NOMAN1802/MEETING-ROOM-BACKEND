import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouters
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;