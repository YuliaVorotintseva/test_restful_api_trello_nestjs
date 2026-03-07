import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCardDTO {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    @MaxLength(100, { message: 'Title must not exceed 100 characters' })
    @ApiProperty({ description: 'Title of the card', nullable: false })
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'Description must not exceed 500 characters' })
    @ApiProperty({ description: 'Description of the card', nullable: true })
    description?: string;
}