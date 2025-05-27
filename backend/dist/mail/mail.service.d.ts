import { CreateMailDto } from './dto/create-mail.dto';
import { Mail } from './entities/mail.entity';
import { Repository } from 'typeorm';
export declare class MailService {
    private mailDB;
    constructor(mailDB: Repository<Mail>);
    saveEmail(createMailDto: CreateMailDto): Promise<Mail>;
    getEmails(): Promise<Mail[]>;
}
