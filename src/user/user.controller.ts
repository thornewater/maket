import { Body, Controller, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';

@Controller('user')
export class UserController {
  @Get()
  create(@Body() user: CreateUserDto) {}
}
