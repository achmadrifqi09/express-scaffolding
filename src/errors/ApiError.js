export class ApiError extends Error {
    /**
     * @param {number} statusCode HTTP status code
     * @param {string} message Human readable message
     * @param {object} [opts] optional metadata
     * - isOperational: boolean (default true) -> operational vs programmer error
     * - errors: array/object additional error details (e.g. validation)
     * - code: internal app code
     */

    constructor(statusCode, message, opts = {}) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = opts.code || "UNKNOWN_ERROR";
        this.isOperational =
            opts.isOperational !== undefined ? opts.isOperational : true;
        this.errors = opts.errors || null;
        Error.captureStackTrace(this, this.constructor);
    }
    toJSON() {
        return {
            code: this.code,
            message: this.message,
            ...(this.errors || this.statusCode >= 400
                ? { errors: this.errors }
                : { data: null }),
        };
    }
}
