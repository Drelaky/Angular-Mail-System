"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const label_entity_1 = require("./entities/label.entity");
let LabelService = class LabelService {
    labeldb;
    constructor(labeldb) {
        this.labeldb = labeldb;
    }
    async create(createLabelDto) {
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
};
exports.LabelService = LabelService;
exports.LabelService = LabelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(label_entity_1.Label)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LabelService);
//# sourceMappingURL=label.service.js.map