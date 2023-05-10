import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpAndInUserDto } from '../dtos/signUpIn.user.dto';

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async getUserInfoByName(userName: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ name: userName });
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async getByUserId(userId: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id: userId });
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(userData: SignUpAndInUserDto) {
    try {
      await this.userRepository.insert(userData);
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }
}
