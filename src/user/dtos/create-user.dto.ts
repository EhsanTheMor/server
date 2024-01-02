import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsString()
  @IsOptional()
  createdAt: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
