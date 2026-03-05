import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "./user.entity";
import { Comment } from "./comment.entitiy";
import { ColumnEntity } from "./column.entity";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.cards)
    author: User;

    @Column()
    authorId: number;

    @ManyToOne(() => ColumnEntity, column => column.cards)
    column: ColumnEntity;

    @Column()
    columnId: number;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}