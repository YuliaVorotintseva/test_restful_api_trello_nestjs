import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LogupDTO } from "./logup.dto";
import { RefreshTokenDTO } from "./refresh-token.dto";
import { Owner } from "src/shared/decorators/owner.decorator";
import { User } from "src/entities/user.entity";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('logup')
    @ApiOperation({ summary: 'Registers new user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async logup(@Body() logupDTO: LogupDTO) {
        return this.authService.logup(logupDTO.email, logupDTO.password);
    }

    @Post('login')
    @UseGuards(AuthGuard('auth'))
    @ApiOperation({ summary: 'User authorization' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Updates user\' refresh token' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
        return this.authService.refreshToken(refreshTokenDTO.refreshToken);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'User logout' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async logout(@Owner() owner) {
        await this.authService.logout(owner.userId);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Gets all user data' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    getProfile(@Request() request) {
        return request.user;
    }
}