import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { Label } from './entities/label.entity';
import { Mail } from '@app/mail/entities/mail.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private labeldb: Repository<Label>,
  ) {}

  async create(createLabelDto: CreateLabelDto) {
    const foundLabel = await this.labeldb.find({
      where: {
        name: createLabelDto.name,
      },
    });

    if (foundLabel && foundLabel.length > 0) {
      return 'van';
    }

    return this.labeldb.save(createLabelDto);
  }

  findAll() {
    return this.labeldb.find();
  }
}
