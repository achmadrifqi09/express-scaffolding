import express from "express";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import configs from "./configs/index.js";
import logger from "./configs/logger.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(router);

app.use(notFound);
app.use(errorHandler);

logger.info(`App initialized in ${configs.env} mode`);

export default app;
