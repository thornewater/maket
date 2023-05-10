import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { id: number }) {
    const { id: userId } = payload;
    const userInfo = await this.usersRepository.getByUserId(userId);

    if (!userInfo) {
      throw new HttpException('User does not exist', HttpStatus.FORBIDDEN);
    }
    return userInfo;
  }
}
