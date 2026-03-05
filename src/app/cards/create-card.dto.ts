import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCardDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
}