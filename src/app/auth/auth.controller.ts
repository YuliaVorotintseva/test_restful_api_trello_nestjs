import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('logup')
    async logup(@Body() body: { email: string, password: string }) {
        return this.authService.logup(body.email, body.password);
    }

    @Post('login')
    @UseGuards(AuthGuard('auth'))
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Request() request) {
        return request.user;
    }
}