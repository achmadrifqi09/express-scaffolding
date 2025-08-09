import logger from "../configs/logger.js";
import { ApiError } from "../errors/ApiError.js";

export default function errorHandler(err, req, res, next) {
    let error = err;

    if (!(error instanceof ApiError)) {
        logger.error("Unexpected Error", { error });
        error = new ApiError(500, "Internal Server Error", {
            isOperational: false,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    logger.error(`${error.statusCode} - ${error.message}`, {
        stack: error.stack,
    });

    res.status(error.statusCode).json(error.toJSON());
}
