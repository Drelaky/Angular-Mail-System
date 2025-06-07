import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

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
