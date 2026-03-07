import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty({ description: 'User\'s email', nullable: false })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({ description: 'User\'s password', nullable: false })
    password: string;
}