import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'utils/error.filter';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [
    BoardService,
    BoardRepository,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class BoardModule {}
