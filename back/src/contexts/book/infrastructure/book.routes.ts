import { Router } from "express";
import { BookController } from "./controller";

export function bookRoutes(controller: BookController): Router {
    const router = Router();
    router.get("/", controller.getBooks.bind(controller));
    return router;
}