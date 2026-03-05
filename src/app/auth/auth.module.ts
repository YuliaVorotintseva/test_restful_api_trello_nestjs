import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthStrategy } from "./auth.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: { expiresIn: configService.get('jwt.expiration') }
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthStrategy, JwtStrategy]
})
export class AuthModule { }