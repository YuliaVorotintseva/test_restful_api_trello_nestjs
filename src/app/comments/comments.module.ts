import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Card } from "src/entities/card.entity";
import { Comment } from "src/entities/comment.entitiy";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Card])],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService]
})
export class CommentsModule { }