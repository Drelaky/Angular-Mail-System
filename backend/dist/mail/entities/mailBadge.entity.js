"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailBadge = void 0;
const typeorm_1 = require("typeorm");
const mail_entity_1 = require("./mail.entity");
let MailBadge = class MailBadge {
    id;
    badge_name;
    color;
    mail;
};
exports.MailBadge = MailBadge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], MailBadge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], MailBadge.prototype, "badge_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], MailBadge.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mail_entity_1.Mail, (mail) => mail.badge, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", mail_entity_1.Mail)
], MailBadge.prototype, "mail", void 0);
exports.MailBadge = MailBadge = __decorate([
    (0, typeorm_1.Entity)({ name: 'mailBadge' })
], MailBadge);
//# sourceMappingURL=mailBadge.entity.js.map