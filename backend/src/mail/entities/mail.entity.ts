import { Label } from '@app/label/entities/label.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MailBadge } from './mailBadge.entity';

@Entity({ name: 'mail' })
export class Mail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  isStared: boolean;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'varchar', default: false, nullable: true })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => MailBadge, (badge: MailBadge) => badge.mail, {
    eager: true,
    cascade: true,
  })
  badge?: MailBadge[];

  @ManyToMany(() => Label, (label) => label.mails, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  labels?: Label[];
}
