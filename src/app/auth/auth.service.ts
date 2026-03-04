import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import { UsersService } from "../users/users.service";
import { User } from "src/entities/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
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
}