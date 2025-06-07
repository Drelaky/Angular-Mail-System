import { Mail } from '@app/mail/entities/mail.entity';
export declare class Label {
    id: string;
    name: string;
    color: string;
    mails: Mail[];
}
