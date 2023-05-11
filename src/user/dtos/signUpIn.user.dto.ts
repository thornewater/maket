import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpAndInUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,16}$/)
  password: string;
}
