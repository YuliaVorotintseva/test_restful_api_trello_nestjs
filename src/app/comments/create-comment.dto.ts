import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDTO {
    @IsNotEmpty({ message: 'Content is required' })
    @IsString()
    @MaxLength(500, { message: 'Content must not exceed 500 characters' })
    content: string;
}