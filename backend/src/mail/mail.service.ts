import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Mail } from './entities/mail.entity';
import { Label } from '@app/label/entities/label.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private mailDB: Repository<Mail>,

    @InjectRepository(Label)
    private labeldb: Repository<Label>,
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

  async updateMailLabel(updateLabelDto: CreateMailDto, id) {
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

  async generateSaveData(updateLabelDto: CreateMailDto, foundMail: Mail) {
    const labelIds = updateLabelDto.labels?.map((label) => label.id) ?? [];

    const labels = await this.labeldb.find({
      where: { id: In(labelIds) },
      relations: ['mails'],
    });

    if (labels.length !== labelIds.length) {
      throw new Error('One or more labels not found');
    }

    foundMail.labels = labels;

    return foundMail;
  }
}
