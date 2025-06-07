import { Mail } from '@app/mail/entities/mail.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'labels' })
export class Label {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany((type) => Mail, (mail) => mail.labels, {
    eager: false,
  })
  @JoinTable()
  mails: Mail[];
}
