import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsNumber()
  contactNumber: number;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
