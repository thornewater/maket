import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async getUserInfoByName(userName: string) {
    return await this.userRepository.findOneBy({ name: userName });
  }

  async createUser(userData: CreateUserDto) {
    await this.userRepository.insert(userData);
  }
}
