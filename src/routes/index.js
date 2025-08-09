import { Router } from "express";
import mainRouter from "./api/main.router.js";

const router = Router();

router.use(mainRouter);
export default router;
