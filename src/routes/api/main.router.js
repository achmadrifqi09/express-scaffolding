import mainController from "../../controllers/main.controller.js";
import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", mainController.getHelloMessage);
mainRouter.get("/errors", mainController.getError);

export default mainRouter;
