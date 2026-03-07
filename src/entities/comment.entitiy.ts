import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { User } from "./user.entity";
import { Card } from "./card.entity";

@Entity('Comments')
export class Comment {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Comment identifier', nullable: false })
    id: number;

    @Column({ type: 'text' })
    @ApiProperty({ description: 'Content of the comment', nullable: false })
    content: string;

    @ManyToOne(() => Card, card => card.comments, { onDelete: 'CASCADE' })
    @ApiHideProperty()
    card: Card;

    @Column()
    @ApiProperty({ description: 'Id of the card', nullable: false })
    cardId: number;

    @ManyToOne(() => User, user => user.comments)
    @ApiHideProperty()
    author: User;

    @Column()
    @ApiProperty({ description: 'Author\'s identifier', nullable: false })
    authorId: number;

    @CreateDateColumn()
    @ApiProperty({ description: 'Comment creation date and time', nullable: false })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'Comment creation date and time', nullable: false })
    updatedAt: Date;
}