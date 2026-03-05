import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Card } from "src/entities/card.entity";
import { ColumnEntity } from "src/entities/column.entity";
import { ColumnsController } from "./columns.controller";
import { ColumnService } from "./columns.service";

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity, Card])],
    controllers: [ColumnsController],
    providers: [ColumnService],
    exports: [ColumnService]
})
export class ColumnsModule { }