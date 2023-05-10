import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    await this.userService.createUser(userData);

    return { message: 'create Success' };
  }
}
