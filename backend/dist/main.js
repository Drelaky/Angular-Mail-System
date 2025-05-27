"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const response_interceptor_1 = require("./interceptors/response.interceptor");
const common_1 = require("@nestjs/common");
const entity_not_found_exception_filter_1 = require("./exceptions/filters/entity-not-found-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), new response_interceptor_1.ResponseInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new entity_not_found_exception_filter_1.EntityNotFoundExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map