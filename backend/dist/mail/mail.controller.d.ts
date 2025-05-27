import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    saveEmail(createMailDto: CreateMailDto): Promise<import("./entities/mail.entity").Mail>;
    getEmails(): Promise<import("./entities/mail.entity").Mail[]>;
}
