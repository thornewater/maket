import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { DataSourceModule } from './data-source/data-source.module';
import { CrawlingModule } from './crawling/crawling.module';

@Module({
  imports: [
    DataSourceModule,
    UserModule,
    AuthModule,
    BoardModule,
    CrawlingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
