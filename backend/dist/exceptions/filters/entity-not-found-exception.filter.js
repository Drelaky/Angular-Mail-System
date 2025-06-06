"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let EntityNotFoundExceptionFilter = class EntityNotFoundExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = common_1.HttpStatus.NOT_FOUND;
        const responseObj = {
            statusCode: status,
            message: 'Not found',
        };
        response.status(status).json(responseObj);
    }
};
exports.EntityNotFoundExceptionFilter = EntityNotFoundExceptionFilter;
exports.EntityNotFoundExceptionFilter = EntityNotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.EntityNotFoundError)
], EntityNotFoundExceptionFilter);
//# sourceMappingURL=entity-not-found-exception.filter.js.map