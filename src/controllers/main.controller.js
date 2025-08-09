import { ApiError } from "../errors/ApiError.js";
import { successResponse } from "../utils/response.js";

const getHelloMessage = async (req, res, next) => {
    return successResponse(res, { test: "hello from controller" });
};

const getError = async (req, res, next) => {
    throw ApiError(500, "Testing error", { code: "APP_ERR" });
};

export default { getHelloMessage, getError };
