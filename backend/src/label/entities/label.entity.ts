import { Mail } from '@app/mail/entities/mail.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'labels' })
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany(() => Mail, (mail) => mail.labels)
  mails: Mail[];
}
