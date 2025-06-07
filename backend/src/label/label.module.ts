import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { Mail } from '@app/mail/entities/mail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), HttpModule],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
