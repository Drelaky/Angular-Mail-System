import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mail } from './mail.entity';

@Entity({ name: 'mailBadge' })
export class MailBadge {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  badge_name: string;

  @Column({ type: 'varchar', length: 255 })
  color: string;

  @ManyToOne(() => Mail, (mail: Mail) => mail.badge, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mail?: Mail;
}
