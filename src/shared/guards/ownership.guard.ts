import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { ColumnEntity } from "src/entities/column.entity";
import { Comment } from "src/entities/comment.entitiy";
import { Repository } from "typeorm";
import { ResourceType } from "../types/main";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(ColumnEntity) private columnsRepository: Repository<ColumnEntity>,
        @InjectRepository(Card) private cardsRepository: Repository<Card>,
        @InjectRepository(Comment) private commentsRepository: Repository<Comment>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const resourceType = this.reflector.get('resourceType', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId;

        const resourceId = this.getResourceId(request, resourceType)
        if (!resourceId) {
            throw new NotFoundException('Resource not found');
        }

        const hasAccess = await this.checkOwnership(resourceType, resourceId, userId);
        if (!hasAccess) {
            throw new ForbiddenException('You don`t have permission to update or delete this resource');
        }

        return true;
    }

    private getResourceId(request: any, type: ResourceType): number | null {
        const params = request.params;
        switch (type) {
            case ResourceType.COLUMN: {
                return params.id ? +params.id : (params.columnId ? +params.columnId : null);
            } case ResourceType.CARD: {
                return params.id ? +params.id : (params.cardId ? +params.cardId : null);
            } case ResourceType.COMMENT: {
                return params.id ? +params.id : (params.commentId ? +params.commentId : null);
            } default: {
                return null;
            }
        }
    }

    private async checkOwnership(type: string, resourceId: number, userId: number): Promise<boolean> {
        switch (type) {
            case ResourceType.COLUMN: {
                const column = await this.columnsRepository.findOne({ where: { id: resourceId } });
                return !!column && column.ownerId === userId;
            } case ResourceType.CARD: {
                const card = await this.cardsRepository.findOne({
                    where: { id: resourceId },
                    relations: ['column']
                });
                return !!card && card.column.ownerId === userId;
            } case ResourceType.COMMENT: {
                const comment = await this.commentsRepository.findOne({
                    where: { id: resourceId },
                    relations: ['card', 'card.collumn']
                });
                return !!comment && comment.card.column.ownerId === userId;
            } default: {
                return false;
            }
        }
    }
}