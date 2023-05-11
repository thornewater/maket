import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './create.board.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RequestWithUser } from 'src/interface/req.inteface';
import { Board } from './board.entity';
import { promises } from 'dns';
import { User } from 'src/user/entities/user.entity';
import { UpdateBoardDto } from './update.board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() boardData: CreateBoardDto,
    @Req() req: RequestWithUser,
  ): Promise<{ message: string }> {
    const userId: number = req.user.id;

    await this.boardService.saveBoard(boardData, userId);

    return { message: 'success' };
  }

  @Get('all')
  async findAllBoard(): Promise<Board[]> {
    return await this.boardService.findAllBoard();
  }

  @Get('myboard')
  @UseGuards(AuthGuard)
  async findBoardByUserId(@Req() req: RequestWithUser): Promise<Board[]> {
    const userId: number = req.user.id;

    return await this.boardService.findBoardByUserId(userId);
  }
  @Patch('update')
  @UseGuards(AuthGuard)
  async updateBoard(
    @Body() updateBoardData: UpdateBoardDto,
    @Req() req: RequestWithUser,
  ) {
    const userId: number = req.user.id;
    await this.boardService.updateBoard(updateBoardData, userId);

    return { message: 'update board success' };
  }

  @Get(':boardId')
  async findOneBoard(@Param('boardId') boardId: number): Promise<Board> {
    return await this.boardService.findOneBoard(boardId);
  }

  @Delete('remove/:boardId')
  @UseGuards(AuthGuard)
  async removeBoard(
    @Param('boardId') boardId: number,
    @Req() req: RequestWithUser,
  ): Promise<{ message: string }> {
    const userId: number = req.user.id;

    await this.boardService.removeBoard(boardId, userId);
    return { message: 'remove success' };
  }
}
