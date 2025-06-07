import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Mail } from './entities/mail.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private mailDB: Repository<Mail>,
  ) {}

  saveEmail(createMailDto: CreateMailDto) {
    // Convert id to number if present to match Mail entity type
    const mail = this.mailDB.create({
      ...createMailDto,
      id: createMailDto.id ? createMailDto.id : undefined,
    });
    return this.mailDB.save(mail);
  }

  getEmails() {
    return this.mailDB.find();
  }

  async editMail(updateMailDto: UpdateMailDto) {
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

  async getOneMail(id: string) {
    let mail = await this.mailDB.findOne({
      where: { id: id },
    });

    return mail;
  }

  async deleteMail(id: string) {
    const mail = await this.mailDB.findOne({
      where: { id: id },
    });

    if (!mail) {
      return `Mail with id ${id} not found`;
    }

    await this.mailDB.remove(mail);
    return `Mail with id ${id} deleted successfully`;
  }
}
