import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Card } from "src/entities/card.entity";
import { Comment } from "src/entities/comment.entitiy";
import { CreateCommentDTO } from "./create-comment.dto";
import { UpdateCommentDTO } from "./update-comment.dto";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>
    ) { }

    async create(createCommentDTO: CreateCommentDTO, cardId: number, authorId: number): Promise<Comment> {
        const card = await this.cardsRepository.findOne({ where: { id: cardId } });
        if (!card) {
            throw new NotFoundException('Card not found');
        }

        const comment = this.commentsRepository.create({
            ...createCommentDTO,
            cardId,
            authorId
        });

        return this.commentsRepository.save(comment);
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['card', 'author']
        });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        return comment;
    }

    async fineAllByCard(columnId: number): Promise<Card[]> {
        return this.cardsRepository.find({
            where: { columnId },
            relations: ['columns', 'comments']
        })
    }

    async update(id: number, updateCommentDTO: UpdateCommentDTO): Promise<Comment> {
        const comment = await this.findOne(id);
        Object.assign(comment, updateCommentDTO);
        return this.commentsRepository.save(comment);
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOne(id);
        await this.commentsRepository.remove(comment);
    }
}