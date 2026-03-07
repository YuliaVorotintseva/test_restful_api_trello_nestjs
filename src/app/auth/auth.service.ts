import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import { UsersService } from "../users/users.service";
import { User } from "src/entities/user.entity";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, refreshToken, refreshTokenExpiration, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id
            })
        }
    }

    async logup(email: string, password: string) {
        const user = await this.usersService.create(email, password);
        return this.login(user);
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.signAsync(this.refreshToken, {
                secret: this.configService.get('jwt.refreshSecret')
            });

            const user = await this.usersService.findById(+payload.sub);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            if (!user.refreshToken || user.refreshToken !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            if (!user.refreshTokenExpiration || new Date() > user.refreshTokenExpiration) {
                throw new UnauthorizedException('Refresh token expired');
            }

            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        } catch (error: unknown) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async generateTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: this.configService.get('jwt.secret'),
                    expiresIn: this.configService.get('jwt.expiration')
                }
            ),
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: this.configService.get('jwt.refreshSecret'),
                    expiresIn: this.configService.get('jwt.refreshExpiration')
                }
            )
        ]);
        return { accessToken, refreshToken };
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const expiresAt = new Date();
        const refreshExpiration = this.configService.get('jwt.refreshExpiration');
        const expiration = refreshExpiration.match(/(\d+)([dhms])/);

        if (expiration) {
            const value = parseInt(expiration[1]);
            const unit = expiration[2];

            switch (unit) {
                case 'd': {
                    expiresAt.setDate(expiresAt.getDate() + value);
                    break;
                } case 'h': {
                    expiresAt.setHours(expiresAt.getHours() + value);
                    break;
                } case 'm': {
                    expiresAt.setMinutes(expiresAt.getMinutes() + value);
                    break;
                } case 's': {
                    expiresAt.setSeconds(expiresAt.getSeconds() + value);
                    break;
                }
            }

            await this.usersService.updateRefreshToken(userId, refreshToken, expiresAt);
        }
    }

    async logout(userId: number) {
        await this.usersService.clearRefreshToken(userId);
    }
}