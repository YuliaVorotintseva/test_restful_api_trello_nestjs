import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { ColumnEntity } from "./column.entity";
import { Card } from "./card.entity";
import { Comment } from "./comment.entitiy";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'User\'s identifier', nullable: false })
    id: number;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'User\'s email', nullable: false })
    email: string;

    @Column()
    @Exclude()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ description: 'User\'s password', nullable: false })
    password: string;

    @OneToMany(() => ColumnEntity, column => column.owner)
    @ApiHideProperty()
    columns: ColumnEntity[];

    @OneToMany(() => Card, card => card.author)
    @ApiHideProperty()
    cards: Card[];

    @OneToMany(() => Comment, comment => comment.author)
    @ApiHideProperty()
    comments: Comment[];

    @Column({ type: 'varchar', nullable: true })
    @Exclude()
    @ApiProperty({ description: 'User\'s refresh token', nullable: true })
    refreshToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    @Exclude()
    @ApiProperty({ description: 'Expiration for the user\'s refresh token', nullable: true })
    refreshTokenExpiration: Date | null;

    @CreateDateColumn()
    @ApiProperty({ description: 'User creation date and time', nullable: false })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'User update date and time', nullable: false })
    updatedAt: Date;
}