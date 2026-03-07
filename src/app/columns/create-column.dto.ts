import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateColumnDTO {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    @MaxLength(100, { message: 'Title must not exceed 100 characters' })
    @ApiProperty({ description: 'Title of the column', nullable: false })
    title: string;
}