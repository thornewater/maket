import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBoardDto } from './create.board.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BoardRepository {
  @InjectRepository(Board)
  private readonly boardRepository: Repository<Board>;

  async saveBoard(boardData: CreateBoardDto) {
    try {
      await this.boardRepository.insert(boardData);
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllBoard() {
    try {
      return await this.boardRepository.find();
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findBoardByUserId(userId: number) {
    try {
      return await this.boardRepository.find({ where: { userId } });
    } catch (error) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneBoard(boardId: number): Promise<Board> {
    try {
      const result = await this.boardRepository.findOneBy({ id: boardId });

      return result;
    } catch (error) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async removeBoard(boardId: number, userId: number): Promise<DeleteResult> {
    try {
      return await this.boardRepository.delete({ id: boardId, userId: userId });
    } catch (error) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }
}
