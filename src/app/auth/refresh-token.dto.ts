import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
    @IsNotEmpty({ message: 'Refresh token is required' })
    @IsString()
    @ApiProperty({ description: 'User\'s refresh token' })
    refreshToken: string;
}