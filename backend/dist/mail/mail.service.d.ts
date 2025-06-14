import { Repository } from 'typeorm';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Mail } from './entities/mail.entity';
import { Label } from '@app/label/entities/label.entity';
export declare class MailService {
    private mailDB;
    private labeldb;
    constructor(mailDB: Repository<Mail>, labeldb: Repository<Label>);
    saveEmail(createMailDto: CreateMailDto): Promise<Mail>;
    getEmails(): Promise<Mail[]>;
    editMail(updateMailDto: UpdateMailDto): Promise<string | Mail>;
    getOneMail(id: string): Promise<Mail | null>;
    deleteMail(id: string): Promise<string>;
    updateMailLabel(updateLabelDto: CreateMailDto, id: any): Promise<string>;
    generateSaveData(updateLabelDto: CreateMailDto, foundMail: Mail): Promise<Mail>;
    selectedAllTypeEmails(type: CreateMailDto): Promise<Mail[] | undefined>;
    foundEmailType(type: string): Promise<Mail[]>;
    foundAllStarredEmails(): Promise<Mail[]>;
}
