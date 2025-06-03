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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mail_entity_1 = require("./entities/mail.entity");
const typeorm_2 = require("typeorm");
let MailService = class MailService {
    mailDB;
    constructor(mailDB) {
        this.mailDB = mailDB;
    }
    saveEmail(createMailDto) {
        const mail = this.mailDB.create({
            ...createMailDto,
            id: createMailDto.id ? createMailDto.id : undefined,
        });
        return this.mailDB.save(mail);
    }
    getEmails() {
        return this.mailDB.find();
    }
    async editMail(updateMailDto) {
        const { id, ...updateData } = updateMailDto;
        const foundMail = await this.mailDB.findOne({
            where: { id },
        });
        if (!foundMail) {
            return `Mail with id ${id} not found`;
        }
        const updatedMail = this.mailDB.merge(foundMail, updateData);
        return this.mailDB.save(updatedMail);
    }
    async getOneMail(id) {
        let mail = await this.mailDB.findOne({
            where: { id: id },
        });
        return mail;
    }
    async deleteMail(id) {
        const mail = await this.mailDB.findOne({
            where: { id: id },
        });
        if (!mail) {
            return `Mail with id ${id} not found`;
        }
        await this.mailDB.remove(mail);
        return `Mail with id ${id} deleted successfully`;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mail_entity_1.Mail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MailService);
//# sourceMappingURL=mail.service.js.map