import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Card } from "src/entities/card.entity";
import { ColumnEntity } from "src/entities/column.entity";
import { ColumnsController } from "./columns.controller";
import { ColumnService } from "./columns.service";
import { CommonModule } from "src/common.module";
import { Comment } from "src/entities/comment.entitiy";

@Module({
    imports: [
        TypeOrmModule.forFeature([ColumnEntity, Card, Comment]),
        CommonModule
    ],
    controllers: [ColumnsController],
    providers: [ColumnService],
    exports: [ColumnService]
})
export class ColumnsModule { }