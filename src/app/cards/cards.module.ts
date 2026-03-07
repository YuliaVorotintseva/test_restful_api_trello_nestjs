import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Card } from "src/entities/card.entity";
import { ColumnEntity } from "src/entities/column.entity";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { CommonModule } from "src/common.module";
import { Comment } from "src/entities/comment.entitiy";

@Module({
    imports: [
        TypeOrmModule.forFeature([Card, ColumnEntity, Comment]),
        CommonModule
    ],
    controllers: [CardsController],
    providers: [CardsService],
    exports: [CardsService]
})
export class CardsModule { }