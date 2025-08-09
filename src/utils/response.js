export function successResponse(
    res,
    data = {},
    message = "Success",
    statusCode = 200
) {
    return res.status(statusCode).json({
        code: "SUCCESS",
        message,
        data,
    });
}

export function errorResponse(
    res,
    code = "ERROR",
    message = "Error",
    errors = null,
    statusCode = 500
) {
    return res.status(statusCode).json({
        code,
        message,
        errors,
    });
}
