import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LogupDTO } from "./logup.dto";
import { RefreshTokenDTO } from "./refresh-token.dto";
import { Owner } from "src/shared/decorators/owner.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('logup')
    async logup(@Body() logupDTO: LogupDTO) {
        return this.authService.logup(logupDTO.email, logupDTO.password);
    }

    @Post('login')
    @UseGuards(AuthGuard('auth'))
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @Post('refresh')
    async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
        return this.authService.refreshToken(refreshTokenDTO.refreshToken);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Owner() owner) {
        await this.authService.logout(owner.userId);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Owner() owner) {
        return owner;
    }
}