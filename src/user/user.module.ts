import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'utils/error.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class UserModule {}
