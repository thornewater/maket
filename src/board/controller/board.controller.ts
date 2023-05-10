import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { CreateBoardDto } from '../dtos/create.board.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RequestWithUser } from 'src/interface/req.inteface';
import { Board } from '../entities/board.entity';
import { UpdateBoardDto } from '../dtos/update.board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Post()
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

  @Get('pagenation')
  async findBoardByLimitOffset(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<Board[]> {
    return await this.boardService.findBoardByLimitOffset(limit, offset);
  }

  @UseGuards(AuthGuard)
  @Get('myboard')
  async findBoardByUserId(@Req() req: RequestWithUser): Promise<Board[]> {
    const userId: number = req.user.id;

    return await this.boardService.findBoardByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
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

  @UseGuards(AuthGuard)
  @Delete('remove/:boardId')
  async removeBoard(
    @Param('boardId') boardId: number,
    @Req() req: RequestWithUser,
  ): Promise<{ message: string }> {
    const userId: number = req.user.id;

    await this.boardService.removeBoard(boardId, userId);
    return { message: 'remove success' };
  }
}
