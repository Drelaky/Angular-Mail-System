import { Repository } from 'typeorm';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Mail } from './entities/mail.entity';
export declare class MailService {
    private mailDB;
    constructor(mailDB: Repository<Mail>);
    saveEmail(createMailDto: CreateMailDto): Promise<Mail>;
    getEmails(): Promise<Mail[]>;
    editMail(updateMailDto: UpdateMailDto): Promise<string | Mail>;
    getOneMail(id: string): Promise<Mail | null>;
    deleteMail(id: string): Promise<string>;
}
