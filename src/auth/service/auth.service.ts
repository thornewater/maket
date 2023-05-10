import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpAndInUserDto } from 'src/user/dtos/signUpIn.user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: SignUpAndInUserDto) {
    const userInfo: User | undefined =
      await this.userRepository.getUserInfoByName(user.name);

    const pwCheck = await bcrypt.compare(user.password, userInfo.password);

    if (!userInfo || !pwCheck) {
      throw new HttpException('USER_NOT_VALID', HttpStatus.UNAUTHORIZED);
    }
    const token = this.jwtService.sign({ id: userInfo.id });

    return { accessToke: token, name: userInfo.name };
  }
}
