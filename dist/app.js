"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const environment_1 = require("./config/environment");
const logger_1 = require("./config/logger");
const errorHandler_1 = require("./core/middleware/errorHandler");
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: environment_1.env.CORS_ORIGIN }));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: environment_1.env.RATE_LIMIT_WINDOW_MS,
    max: environment_1.env.RATE_LIMIT_MAX_REQUESTS,
});
app.use(limiter);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined', { stream: { write: (message) => logger_1.logger.info(message.trim()) } }));
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use(index_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map