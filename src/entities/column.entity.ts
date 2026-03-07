import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "./user.entity";
import { Card } from "./card.entity";

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
    owner: User;

    @Column()
    ownerId: number;

    @OneToMany(() => Card, card => card.column, { cascade: true })
    cards: Card[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}