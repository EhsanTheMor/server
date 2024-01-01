import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SignInDto } from 'src/user/dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  @Post()
  signIn(@Body() body: SignInDto) {
    return 'user';
  }

  @Post()
  signUp(@Body() body: CreateUserDto) {
    return 'user';
  }
}
