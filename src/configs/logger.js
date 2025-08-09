import winston, { format, transports } from "winston";
import config from "./index.js";

const logFormat = format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaStr}`;
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
        filename: config.log.file,
        format: format.combine(format.timestamp(), logFormat),
    }),
];

if (config.log.database) {
    const { MongoDB } = await import("winston-mongodb");
    loggerTransports.push(
        new MongoDB({
            level: config.log.level,
            db: config.log.database,
            options: { useUnifiedTopology: true },
            collection: "logs",
        })
    );
}

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
            const metaStr = Object.keys(meta).length
                ? JSON.stringify(meta)
                : "";
            return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaStr}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf((info) => info.message),
                winston.format.simple()
            ),
            stderrLevels: ["error"],
        }),
    ],
});

export default logger;
