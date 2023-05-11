import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './create.board.dto';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async saveBoard(boardData: CreateBoardDto, userId: number) {
    boardData.userId = userId;
    await this.boardRepository.saveBoard(boardData);
  }

  async findAllBoard() {
    return await this.boardRepository.findAllBoard();
  }

  async findBoardByUserId(userId: number) {
    return await this.boardRepository.findBoardByUserId(userId);
  }

  async findOneBoard(boardId: number): Promise<Board> {
    const result = await this.boardRepository.findOneBoard(boardId);

    if (!result) {
      throw new HttpException('boardId not value', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async removeBoard(boardId: number, userId: number): Promise<void> {
    const result = await this.boardRepository.removeBoard(boardId, userId);

    if (result.affected != 1) {
      throw new HttpException('Check userId or boardId', HttpStatus.FORBIDDEN);
    }
  }
}
