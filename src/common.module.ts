import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ColumnEntity } from "./entities/column.entity";
import { Card } from "./entities/card.entity";
import { Comment } from "./entities/comment.entitiy";
import { OwnershipGuard } from "./shared/guards/ownership.guard";

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity, Card, Comment])],
    providers: [OwnershipGuard],
    exports: [OwnershipGuard]
})
export class CommonModule { }