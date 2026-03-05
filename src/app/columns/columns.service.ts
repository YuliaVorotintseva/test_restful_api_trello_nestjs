import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ColumnEntity } from "src/entities/column.entity";
import { CreateColumnDTO } from "./create-column.dto";
import { UpdateCommentDTO } from "../comments/update-comment.dto";

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

    async findOne(id: number, ownerId: number) {
        const column = await this.columnsRepository.findOne({
            where: { id, ownerId },
            relations: ['owner', 'cards']
        });

        if (!column) {
            throw new NotFoundException('Column not found');
        }

        return column;
    }

    async update(id: number, updateColumnDTO: UpdateCommentDTO, ownerId: number): Promise<ColumnEntity> {
        const column = await this.findOne(id, ownerId);

        if (column.ownerId !== ownerId) {
            throw new ForbiddenException('You can only update your own columns');
        }

        Object.assign(column, updateColumnDTO);
        return this.columnsRepository.save(column);
    }

    async remove(id: number, ownerId: number): Promise<void> {
        const column = await this.findOne(id, ownerId);

        if (column.ownerId !== ownerId) {
            throw new ForbiddenException('You can only delete your own columns');
        }

        await this.columnsRepository.remove(column);
    }
}