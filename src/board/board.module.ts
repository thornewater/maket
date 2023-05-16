import { Module } from '@nestjs/common';
import { BoardController } from './controller/board.controller';
import { BoardService } from './service/board.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './repository/board.repository';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'utils/error.filter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), ScheduleModule.forRoot()],
  controllers: [BoardController],
  providers: [
    BoardService,
    BoardRepository,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class BoardModule {}
