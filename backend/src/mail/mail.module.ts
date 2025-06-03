import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { HttpModule } from '@nestjs/axios';
import { MailBadge } from './entities/mailBadge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mail, MailBadge]), HttpModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
