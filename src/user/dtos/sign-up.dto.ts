import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  passwordConfirmation: string;

  @IsNumber()
  contactNumber: number;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
