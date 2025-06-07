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
const typeorm_2 = require("typeorm");
const mail_entity_1 = require("./entities/mail.entity");
const label_entity_1 = require("../label/entities/label.entity");
let MailService = class MailService {
    mailDB;
    labeldb;
    constructor(mailDB, labeldb) {
        this.mailDB = mailDB;
        this.labeldb = labeldb;
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
    async updateMailLabel(updateLabelDto, id) {
        const foundMail = await this.mailDB.findOne({
            where: { id: id },
        });
        if (!foundMail) {
            return `Mail with id ${updateLabelDto.id} not found`;
        }
        let data = await this.generateSaveData(updateLabelDto, foundMail);
        this.mailDB.save(data);
        return 'Label updated successfully';
    }
    async generateSaveData(updateLabelDto, foundMail) {
        const labelIds = updateLabelDto.labels?.map((label) => label.id) ?? [];
        const labels = await this.labeldb.find({
            where: { id: (0, typeorm_2.In)(labelIds) },
            relations: ['mails'],
        });
        if (labels.length !== labelIds.length) {
            throw new Error('One or more labels not found');
        }
        foundMail.labels = labels;
        return foundMail;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mail_entity_1.Mail)),
    __param(1, (0, typeorm_1.InjectRepository)(label_entity_1.Label)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MailService);
//# sourceMappingURL=mail.service.js.map