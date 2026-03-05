import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Card } from "src/entities/card.entity";
import { ColumnEntity } from "src/entities/column.entity";
import { CreateCardDTO } from "./create-card.dto";

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
        @InjectRepository(ColumnEntity)
        private columnsRepository: Repository<ColumnEntity>
    ) { }

    async create(createCardDTO: CreateCardDTO, columnId: number, authorId: number): Promise<Card> {
        const column = await this.columnsRepository.findOne({ where: { id: columnId } });
        if (!column) {
            throw new NotFoundException('Column not found');
        }

        const card = await this.cardsRepository.create({
            ...createCardDTO,
            columnId,
            authorId
        });

        return this.cardsRepository.save(card);
    }

    async findOne(id: number, authorId: number): Promise<Card> {
        const card = await this.cardsRepository.findOne({
            where: { id, authorId },
            relations: ['author', 'column', 'comments', 'comments.author']
        });

        if (!card) {
            throw new NotFoundException('Card not found');
        }

        return card;
    }

    async remove(id: number, authorId: number): Promise<void> {
        const card = await this.findOne(id, authorId);
        await this.cardsRepository.remove(card);
    }
}