import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { User } from "./user.entity";
import { Comment } from "./comment.entitiy";
import { ColumnEntity } from "./column.entity";

@Entity('Cards')
export class Card {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Card identifier', nullable: false })
    id: number;

    @Column()
    @ApiProperty({ description: 'Card title', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    @ApiProperty({ description: 'Description of the card', nullable: false })
    description: string;

    @ManyToOne(() => User, user => user.cards, { onDelete: 'CASCADE' })
    @ApiHideProperty()
    author: User;

    @Column()
    @ApiProperty({ description: 'Author\'s identifier', nullable: false })
    authorId: number;

    @ManyToOne(() => ColumnEntity, column => column.cards, { onDelete: 'CASCADE' })
    @ApiHideProperty()
    column: ColumnEntity;

    @Column()
    @ApiProperty({ description: 'Id of the column', nullable: false })
    columnId: number;

    @OneToMany(() => Comment, comment => comment.card, { cascade: true })
    @ApiHideProperty()
    comments: Comment[];

    @CreateDateColumn()
    @ApiProperty({ description: 'Card creation date and time', nullable: false })
    createdAt: string;

    @UpdateDateColumn()
    @ApiProperty({ description: 'Card update date and time', nullable: false })
    updatedAt: string;
}