import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordConfirmation: string;

  @ApiProperty()
  @IsNumber()
  contactNumber: number;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl: string;
}
