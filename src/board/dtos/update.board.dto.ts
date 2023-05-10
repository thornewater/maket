import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Category not Empty' })
  category?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'title not Empty' })
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'content not Empty' })
  content?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  userId?: number;
}
