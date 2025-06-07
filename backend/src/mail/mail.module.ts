import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { MailBadge } from './entities/mailBadge.entity';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { Label } from '@app/label/entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mail, MailBadge, Label]), HttpModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
