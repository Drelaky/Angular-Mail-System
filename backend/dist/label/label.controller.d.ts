import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
export declare class LabelController {
    private readonly labelService;
    constructor(labelService: LabelService);
    create(createLabelDto: CreateLabelDto): Promise<"van" | (CreateLabelDto & import("./entities/label.entity").Label)>;
    findAll(): Promise<import("./entities/label.entity").Label[]>;
}
