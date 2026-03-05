import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ColumnEntity } from "./column.entity";
import { Card } from "./card.entity";
import { Comment } from "./comment.entitiy";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @Exclude()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @OneToMany(() => ColumnEntity, column => column.owner)
    columns: ColumnEntity[];

    @OneToMany(() => Card, card => card.author)
    cards: Card[];

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[];

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}