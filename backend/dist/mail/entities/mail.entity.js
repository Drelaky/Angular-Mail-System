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
exports.Mail = void 0;
const typeorm_1 = require("typeorm");
const mailBadge_entity_1 = require("./mailBadge.entity");
const label_entity_1 = require("../../label/entities/label.entity");
let Mail = class Mail {
    id;
    name;
    email;
    message;
    isStared;
    isRead;
    role;
    createdAt;
    badge;
    labels;
};
exports.Mail = Mail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Mail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Mail.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Mail.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Mail.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Mail.prototype, "isStared", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Mail.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: false, nullable: true }),
    __metadata("design:type", String)
], Mail.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Mail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mailBadge_entity_1.MailBadge, (badge) => badge.mail, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Mail.prototype, "badge", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => label_entity_1.Label, (label) => label.mails, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Mail.prototype, "labels", void 0);
exports.Mail = Mail = __decorate([
    (0, typeorm_1.Entity)({ name: 'mail' })
], Mail);
//# sourceMappingURL=mail.entity.js.map