import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Label } from './entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), HttpModule],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
