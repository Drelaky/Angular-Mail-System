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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const create_mail_dto_1 = require("./dto/create-mail.dto");
const update_mail_dto_1 = require("./dto/update-mail.dto");
let MailController = class MailController {
    mailService;
    constructor(mailService) {
        this.mailService = mailService;
    }
    saveEmail(createMailDto) {
        this.mailService.saveEmail(createMailDto);
        return { message: 'Email saved successfully' };
    }
    async getEmails() {
        const getEmails = await this.mailService.getEmails();
        getEmails.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return {
            count: getEmails.length,
            emails: getEmails,
        };
    }
    async editMail(updateMailDto) {
        const updatedMail = await this.mailService.editMail(updateMailDto);
        return updatedMail;
    }
    async getOneMail(id) {
        return await this.mailService.getOneMail(id);
    }
    async getActionData() {
        let mails = await this.mailService.getEmails();
        const actionData = [
            {
                title: 'Actions',
                content: [
                    {
                        title: 'Inbox',
                        count: mails.filter((mail) => !mail.isRead).length,
                        active: true,
                    },
                    {
                        title: 'Starred',
                        count: mails.filter((mail) => mail.isStared).length,
                        active: false,
                    },
                    {
                        title: 'Spam',
                        count: mails.filter((mail) => mail.role === 'Spam').length,
                        active: false,
                    },
                    {
                        title: 'Important',
                        count: mails.filter((mail) => mail.role === 'Important').length,
                        active: false,
                    },
                    {
                        title: 'Sent',
                        count: mails.filter((mail) => mail.role === 'sent').length,
                        active: false,
                    },
                    {
                        title: 'Drafts',
                        count: mails.filter((mail) => mail.role === 'draft').length,
                        active: false,
                    },
                    {
                        title: 'Trash',
                        count: mails.filter((mail) => mail.role === 'trash').length,
                        active: false,
                    },
                ],
            },
            {
                title: 'Labels',
                content: undefined,
            },
        ];
        return actionData;
    }
    async searchEmail(search) {
        if (!search) {
            return { count: 0, emails: [] };
        }
        const emails = await this.mailService.getEmails();
        const filteredEmails = emails.filter((email) => email.name.toLowerCase().includes(search.toLowerCase()) ||
            email.email.toLowerCase().includes(search.toLowerCase()) ||
            email.message.toLowerCase().includes(search.toLowerCase()));
        return {
            count: filteredEmails.length,
            emails: filteredEmails,
        };
    }
    async deleteMail(id) {
        return await this.mailService.deleteMail(id);
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)('saveEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mail_dto_1.CreateMailDto]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "saveEmail", null);
__decorate([
    (0, common_1.Get)('getEmails'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailController.prototype, "getEmails", null);
__decorate([
    (0, common_1.Patch)('editMail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_mail_dto_1.UpdateMailDto]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "editMail", null);
__decorate([
    (0, common_1.Get)('getOneMail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "getOneMail", null);
__decorate([
    (0, common_1.Get)('getActionData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailController.prototype, "getActionData", null);
__decorate([
    (0, common_1.Get)('searchEmails/:search'),
    __param(0, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "searchEmail", null);
__decorate([
    (0, common_1.Delete)('deleteMail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "deleteMail", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map