import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateBoardDto } from '../dtos/create.board.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateBoardDto } from '../dtos/update.board.dto';

@Injectable()
export class BoardRepository {
  @InjectRepository(Board)
  private readonly boardRepository: Repository<Board>;

  async saveBoard(boardData: CreateBoardDto) {
    try {
      await this.boardRepository
        .createQueryBuilder()
        .insert()
        .into(Board)
        .values(boardData)
        .execute();
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllBoard(): Promise<Board[]> {
    try {
      const result = await this.boardRepository.createQueryBuilder().getMany();
      return result;
    } catch (err) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findBoardByLimitOffset(
    limit: number,
    offset: number,
  ): Promise<Board[]> {
    try {
      return await this.boardRepository
        .createQueryBuilder()
        .take(limit)
        .skip(offset)
        .getMany();
    } catch (err) {
      console.log(err);
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findBoardByUserId(userId: number): Promise<Board[]> {
    try {
      return await this.boardRepository
        .createQueryBuilder()
        .select()
        .where('user_id= :userId', { userId: `${userId}` })
        .getMany();
    } catch {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async updateBoard(
    updateBoardData: UpdateBoardDto,
    userId: number,
  ): Promise<UpdateResult> {
    try {
      return await this.boardRepository
        .createQueryBuilder()
        .update(Board)
        .set(updateBoardData)
        .where(`id=:boardId and user_id=:userId`, {
          boardId: updateBoardData.id,
          userId: userId,
        })
        .execute();
    } catch (error) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneBoard(boardId: number): Promise<Board> {
    try {
      return await this.boardRepository
        .createQueryBuilder()
        .select(['Board.id', 'Board.category', 'Board.title', 'Board.content'])
        .where('Board.id=:boardId', { boardId: boardId })
        .getOne();
    } catch (error) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }

  async removeBoard(boardId: number, userId: number): Promise<DeleteResult> {
    try {
      return await this.boardRepository
        .createQueryBuilder()
        .delete()
        .where(`id=:boardId and user_id= :userId`, {
          boardId: boardId,
          userId: userId,
        })
        .execute();
    } catch (error) {
      throw new HttpException('SqlError', HttpStatus.BAD_REQUEST);
    }
  }
}
