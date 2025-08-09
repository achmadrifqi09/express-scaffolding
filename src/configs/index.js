import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
const envPath = path.resolve(process.cwd(), envFile);

if (fs.existsSync(envPath) && !envFile.includes(".example")) {
    dotenv.config({ path: envPath });
    console.info(`Loaded environment from ${envFile}`);
} else {
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
    console.info(`Loaded default .env`);
}

export default {
    env: process.env.NODE_ENV || "development",
    port: process.env.APP_PORT || 3001,
    log: {
        level: process.env.LOG_LEVEL || "info",
        file: process.env.LOG_FILE || "logs/app.log",
        database: process.env.LOG_DB || null,
    },
};
