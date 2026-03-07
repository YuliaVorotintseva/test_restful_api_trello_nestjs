import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
    @IsNotEmpty({ message: 'Refresh token is required' })
    @IsString()
    refreshToken: string;
}