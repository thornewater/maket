import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: 'Category not Empty' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: 'title not Empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'content not Empty' })
  content: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  userId?: number;
}
