import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
