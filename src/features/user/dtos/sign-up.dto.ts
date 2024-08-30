import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordConfirmation: string;

  @ApiProperty()
  @IsNumber()
  contactNumber: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl: string;
}
