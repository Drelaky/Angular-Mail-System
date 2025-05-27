import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('saveEmail')
  saveEmail(@Body() createMailDto: CreateMailDto) {
    return this.mailService.saveEmail(createMailDto);
  }

  @Get('getEmails')
  async getEmails() {
    const getEmails = await this.mailService.getEmails();

    getEmails.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return this.mailService.getEmails();
  }
}
