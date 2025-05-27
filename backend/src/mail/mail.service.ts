import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private mailDB: Repository<Mail>,
  ) {}

  saveEmail(createMailDto: CreateMailDto) {
    const mail = this.mailDB.create(createMailDto);
    return this.mailDB.save(mail);
  }

  getEmails() {
    return this.mailDB.find();
  }
}
