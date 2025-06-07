import { InboxSidebarType } from '@app/types/emailActions.types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('saveEmail')
  saveEmail(@Body() createMailDto: CreateMailDto) {
    this.mailService.saveEmail(createMailDto);

    return { message: 'Email saved successfully' };
  }

  @Get('getEmails')
  async getEmails() {
    const getEmails = await this.mailService.getEmails();

    getEmails.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return {
      count: getEmails.length,
      emails: getEmails,
    };
  }

  @Patch('editMail')
  async editMail(@Body() updateMailDto: UpdateMailDto) {
    const updatedMail = await this.mailService.editMail(updateMailDto);

    return updatedMail;
  }

  @Get('getOneMail/:id')
  async getOneMail(@Param('id') id: string) {
    return await this.mailService.getOneMail(id);
  }

  @Get('getActionData')
  async getActionData() {
    let mails = await this.mailService.getEmails();

    const actionData: InboxSidebarType[] = [
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

  @Get('searchEmails/:search')
  async searchEmail(@Param('search') search: string) {
    if (!search) {
      return { count: 0, emails: [] };
    }

    const emails = await this.mailService.getEmails();

    const filteredEmails = emails.filter(
      (email) =>
        email.name.toLowerCase().includes(search.toLowerCase()) ||
        email.email.toLowerCase().includes(search.toLowerCase()) ||
        email.message.toLowerCase().includes(search.toLowerCase()),
    );

    return {
      count: filteredEmails.length,
      emails: filteredEmails,
    };
  }

  @Delete('deleteMail/:id')
  async deleteMail(@Param('id') id: string) {
    return await this.mailService.deleteMail(id);
  }
}
