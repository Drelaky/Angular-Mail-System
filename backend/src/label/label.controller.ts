import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { LabelService } from './label.service';

@Controller()
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post('createLabels')
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }

  @Get('getLabels')
  findAll() {
    return this.labelService.findAll();
  }
}
