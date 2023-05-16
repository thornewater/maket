import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpAndInUserDto } from '../dtos/signUpIn.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: SignUpAndInUserDto): Promise<void> {
    const saltRound = 10;

    const userInfo: User = await this.userRepository.getUserInfoByName(
      userData.name,
    );

    if (userInfo) {
      throw new HttpException('Duplicate Account ', HttpStatus.BAD_REQUEST);
    }

    userData.password = await bcrypt.hash(userData.password, saltRound);

    await this.userRepository.createUser(userData);
  }

  async validatePassword(userData: SignUpAndInUserDto) {
    const userInfoByName: User | undefined =
      await this.userRepository.getUserInfoByName(userData.name);
    if (!userInfoByName) {
      throw new HttpException(
        '아이디가 올바르지않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const pwCheck = await bcrypt.compare(
      userData.password,
      userInfoByName.password,
    );

    if (!pwCheck) {
      throw new HttpException(
        '올바른 비밀번호가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
