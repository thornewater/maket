import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto): Promise<void> {
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
}
