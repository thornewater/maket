import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataSourceModule } from './data-souerce/data-source.module';

@Module({
  imports: [DataSourceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
