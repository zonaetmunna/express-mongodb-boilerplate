"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../config/swagger");
const auth_routes_1 = __importDefault(require("../modules/auth/routes/auth.routes"));
const router = (0, express_1.Router)();
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
router.use('/api-docs', swagger_ui_express_1.default.serve);
router.get('/api-docs', swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Express API Documentation',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        syntaxHighlight: {
            theme: 'monokai'
        }
    }
}));
router.get('/api-docs/openapi.yaml', (req, res) => {
    try {
        const openApiPath = path_1.default.join(__dirname, '../../docs/api/v1/openapi.yaml');
        const fileContents = fs_1.default.readFileSync(openApiPath, 'utf8');
        res.setHeader('Content-Type', 'application/yaml');
        res.send(fileContents);
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to load OpenAPI specification'
        });
    }
});
router.get('/api-docs/openapi.json', (req, res) => {
    try {
        const openApiPath = path_1.default.join(__dirname, '../../docs/api/v1/openapi.yaml');
        const fileContents = fs_1.default.readFileSync(openApiPath, 'utf8');
        const jsonSpec = js_yaml_1.default.load(fileContents);
        res.json(jsonSpec);
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to load OpenAPI specification'
        });
    }
});
router.use('/api/v1/auth', auth_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map