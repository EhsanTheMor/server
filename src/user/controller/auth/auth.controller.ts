import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SignInDto } from 'src/user/dtos/sign-in.dto';
import { SignUpDto } from 'src/user/dtos/sign-up.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { JwtInterceptor } from 'src/user/interceptors/jwt.interceptor';
import { AuthService } from 'src/user/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
