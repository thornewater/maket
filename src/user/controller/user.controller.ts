import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpAndInUserDto } from '../dtos/signUpIn.user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: SignUpAndInUserDto) {
    await this.userService.createUser(userData);

    return { message: 'create Success' };
  }
  @Post('pwcheck')
  async validatePassword(@Body() userData: SignUpAndInUserDto) {
    await this.userService.validatePassword(userData);

    return '패스워드 체크 성공';
  }
}
