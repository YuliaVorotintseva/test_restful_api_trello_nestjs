import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "./user.entity";
import { Card } from "./card.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => Card, card => card.comments, { onDelete: 'CASCADE' })
    card: Card;

    @Column()
    cardId: number;

    @ManyToOne(() => User, user => user.comments)
    author: User;

    @Column()
    authorId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}