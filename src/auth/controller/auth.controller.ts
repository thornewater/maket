import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpAndInUserDto } from 'src/user/dtos/signUpIn.user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RequestWithUser } from 'src/interface/req.inteface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() user: SignUpAndInUserDto) {
    return await this.authService.signIn(user);
  }

  // @Get()
  // @UseGuards(AuthGuard)
  // async checkAuth(@Req() req: RequestWithUser) {
  //   const user = req.user;

  //   return user;
  // }
}
