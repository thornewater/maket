import { DataSourceModule } from 'src/data-souerce/data-source.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  imports: [DataSourceModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
