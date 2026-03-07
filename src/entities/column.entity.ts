import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { User } from "./user.entity";
import { Card } from "./card.entity";

@Entity('Columns')
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Column identifier', nullable: false })
    id: number;

    @Column()
    @ApiProperty({ description: 'Column title', nullable: false })
    title: string;

    @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
    @ApiHideProperty()
    owner: User;

    @Column()
    @ApiProperty({ description: 'Owner\'s id', nullable: false })
    ownerId: number;

    @OneToMany(() => Card, card => card.column, { cascade: true })
    @ApiHideProperty()
    cards: Card[];

    @CreateDateColumn()
    @ApiProperty({ description: 'Column creation date and time', nullable: false })
    createdAt: string;

    @UpdateDateColumn()
    @ApiProperty({ description: 'Column update date and time', nullable: false })
    updatedAt: string;
}