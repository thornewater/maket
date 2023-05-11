import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './create.board.dto';
import { Board } from './board.entity';
import { UpdateBoardDto } from './update.board.dto';

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

  async updateBoard(
    updateBoardData: UpdateBoardDto,
    userId: number,
  ): Promise<void> {
    const checkBoardId = await this.boardRepository.findOneBoard(
      updateBoardData.id,
    );
    if (!checkBoardId) {
      throw new HttpException('Board not valid', HttpStatus.FORBIDDEN);
    }

    const result = await this.boardRepository.updateBoard(
      updateBoardData,
      userId,
    );

    if (result.affected != 1) {
      throw new HttpException('Check userId or boardId', HttpStatus.FORBIDDEN);
    }
  }

  async findOneBoard(boardId: number): Promise<Board> {
    const result = await this.boardRepository.findOneBoard(boardId);

    if (!result) {
      throw new HttpException('boardId not value', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async removeBoard(boardId: number, userId: number): Promise<void> {
    const checkBoardId = await this.boardRepository.findOneBoard(boardId);

    if (!checkBoardId) {
      throw new HttpException('Board not valid', HttpStatus.FORBIDDEN);
    }

    const result = await this.boardRepository.removeBoard(boardId, userId);

    if (result.affected != 1) {
      throw new HttpException('Fail to Remove', HttpStatus.FORBIDDEN);
    }
  }
}
