import { ApiError } from "../errors/ApiError.js";

export default function notFound(req, res, next) {
    next(new ApiError(404, "Resource Not Found", { code: "NOT_FOUND" }));
}
