"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mail_entity_1 = require("./entities/mail.entity");
const mailBadge_entity_1 = require("./entities/mailBadge.entity");
const mail_controller_1 = require("./mail.controller");
const mail_service_1 = require("./mail.service");
const label_entity_1 = require("../label/entities/label.entity");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mail_entity_1.Mail, mailBadge_entity_1.MailBadge, label_entity_1.Label]), axios_1.HttpModule],
        controllers: [mail_controller_1.MailController],
        providers: [mail_service_1.MailService],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map