import winston, { format, transports } from "winston";
import env from "./env.js";
import moment from "moment-timezone";

const logFormat = format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return `[${level} ${timestamp}]: ${message} ${metaStr}`;
});

const filterServerError = format((info) => {
    let status = info.statusCode || info.original?.statusCode;
    if (info.level === "error" && status >= 500) {
        return info;
    }
    return false;
});

const timestampLocal = format.timestamp({
    format: () => moment().tz(env.timezone).format("YYYY-MM-DD HH:mm:ss"),
});

const loggerTransports = [
    new transports.Console({
        format: format.combine(
            format.colorize(),
            format.timestamp(),
            logFormat
        ),
    }),
    new transports.File({
        level: "error",
        filename: env.log.file,
        format: format.combine(filterServerError(), timestampLocal, logFormat),
    }),
];

if (env.log.database && env.log.transport.includes("database")) {
    const { MongoDB } = await import("winston-mongodb");
    loggerTransports.push(
        new MongoDB({
            level: "error",
            db: env.log.database,
            options: { useUnifiedTopology: true },
            collection: "log_errors",
            format: format.combine(
                filterServerError(),
                timestampLocal,
                logFormat
            ),
        })
    );
}

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        timestampLocal,
        winston.format.errors({ stack: true }),
        winston.format.splat()
    ),
    transports: loggerTransports,
});

export default logger;
