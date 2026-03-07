import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDTO {
    @IsNotEmpty({ message: 'Content is required' })
    @IsString()
    @MaxLength(500, { message: 'Content must not exceed 500 characters' })
    @ApiProperty({ description: 'Content of the comment', nullable: false })
    content: string;
}