import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCommentDTO {
    @IsOptional()
    @IsString()
    @MaxLength(500, {message:'Content must not exceed 500 characters'})
    content?: string;
}