import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpAndInUserDto } from 'src/user/dtos/signUpIn.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() user: SignUpAndInUserDto) {
    return await this.authService.signIn(user);
  }
}
