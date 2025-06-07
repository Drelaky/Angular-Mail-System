import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Repository } from 'typeorm';

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
