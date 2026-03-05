import { IsNotEmpty, IsString } from "class-validator";

export class CreateColumnDTO{
    @IsNotEmpty()
    @IsString()
    title:string;
}