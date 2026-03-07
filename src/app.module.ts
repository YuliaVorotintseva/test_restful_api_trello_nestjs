import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './shared/config/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { ColumnEntity } from './entities/column.entity';
import { Card } from './entities/card.entity';
import { Comment } from './entities/comment.entitiy';
import { ColumnsModule } from './app/columns/columns.module';
import { CardsModule } from './app/cards/cards.module';
import { CommentsModule } from './app/comments/comments.module';
import { CommonModule } from './common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, ColumnEntity, Card, Comment],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule
  ]
})
export class AppModule { }
