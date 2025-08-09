import app from "./app.js";

import configs from "./configs/index.js";
import logger from "./configs/logger.js";

app.listen(configs.port, () => {
    logger.info(`Server running on port ${configs.port}`);
});
