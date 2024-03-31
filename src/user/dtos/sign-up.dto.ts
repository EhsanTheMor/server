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
  // TODO
  // remove role from here only admin can create admin

  @IsString()
  passwordConfirmation: string;

  @IsNumber()
  contactNumber: number;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
