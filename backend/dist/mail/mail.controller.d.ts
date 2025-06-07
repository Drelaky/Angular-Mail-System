import { InboxSidebarType } from '@app/types/emailActions.types';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    saveEmail(createMailDto: CreateMailDto): {
        message: string;
    };
    getEmails(): Promise<{
        count: number;
        emails: import("./entities/mail.entity").Mail[];
    }>;
    editMail(updateMailDto: UpdateMailDto): Promise<string | import("./entities/mail.entity").Mail>;
    getOneMail(id: string): Promise<import("./entities/mail.entity").Mail | null>;
    getActionData(): Promise<InboxSidebarType[]>;
    searchEmail(search: string): Promise<{
        count: number;
        emails: import("./entities/mail.entity").Mail[];
    }>;
    deleteMail(id: string): Promise<string>;
}
