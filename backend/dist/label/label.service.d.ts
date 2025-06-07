import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { Label } from './entities/label.entity';
export declare class LabelService {
    private labeldb;
    constructor(labeldb: Repository<Label>);
    create(createLabelDto: CreateLabelDto): Promise<"van" | (CreateLabelDto & Label)>;
    findAll(): Promise<Label[]>;
}
