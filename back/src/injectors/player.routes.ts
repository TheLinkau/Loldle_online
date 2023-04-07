import { Router } from "express";
import { PlayerController } from "../controller/player.controller";

export function playerRoutes(controller: PlayerController): Router {
    const router = Router();
    router.post("/login", controller.login.bind(controller));
    router.post("/sign_up", controller.sign_up.bind(controller));
    return router;
}