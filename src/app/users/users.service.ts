import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { User } from "src/entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async create(email: string, password: string): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (!!existingUser) {
            throw new ConflictException('This email is already used');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, password: hashedPassword });

        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async updateToken(userId: string, accessToken: string, refreshToken?: string) {
        await this.usersRepository.update(userId, { accessToken, refreshToken });
    }
}