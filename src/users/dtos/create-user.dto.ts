import { IsDateString, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @Length(3, 100)
  username: string;

  @IsString()
  @Length(8)
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: string;
}
