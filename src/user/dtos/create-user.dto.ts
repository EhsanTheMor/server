import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  createdAt: string;

  @IsString()
  imageUrl: string;
}
