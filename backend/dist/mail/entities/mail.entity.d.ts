import { Label } from '@app/label/entities/label.entity';
import { MailBadge } from './mailBadge.entity';
export declare class Mail {
    id: string;
    name: string;
    email: string;
    message: string;
    isStared: boolean;
    isRead: boolean;
    role: string;
    createdAt: Date;
    badge?: MailBadge[];
    labels?: Label[];
}
