import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ColumnEntity } from "src/entities/column.entity";
import { CreateColumnDTO } from "./create-column.dto";
import { UpdateColumnDTO } from "./update-column.dto";

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private columnsRepository: Repository<ColumnEntity>
    ) { }

    async create(createColumnDTO: CreateColumnDTO, ownerId: number): Promise<ColumnEntity> {
        const column = this.columnsRepository.create({
            ...createColumnDTO,
            ownerId
        })
        return this.columnsRepository.save(column);
    }

    async findOne(id: number) {
        const column = await this.columnsRepository.findOne({
            where: { id },
            relations: ['owner', 'cards']
        });

        if (!column) {
            throw new NotFoundException('Column not found');
        }

        return column;
    }

    async fineAllByOwner(ownerId: number): Promise<ColumnEntity[]> {
        return this.columnsRepository.find({
            where: { ownerId },
            relations: ['cards', 'card.comments']
        })
    }

    async update(id: number, updateColumnDTO: UpdateColumnDTO): Promise<ColumnEntity> {
        const column = await this.findOne(id);
        Object.assign(column, updateColumnDTO);
        return this.columnsRepository.save(column);
    }

    async remove(id: number): Promise<void> {
        const column = await this.findOne(id);
        await this.columnsRepository.remove(column);
    }
}