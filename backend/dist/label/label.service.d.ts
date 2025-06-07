import { CreateLabelDto } from './dto/create-label.dto';
import { Label } from './entities/label.entity';
import { Repository } from 'typeorm';
export declare class LabelService {
    private labeldb;
    constructor(labeldb: Repository<Label>);
    create(createLabelDto: CreateLabelDto): Promise<"van" | (CreateLabelDto & Label)>;
    findAll(): Promise<Label[]>;
}
