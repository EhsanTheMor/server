import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SignInDto } from 'src/user/dtos/sign-in.dto';
import { SignUpDto } from 'src/user/dtos/sign-up.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { JwtInterceptor } from 'src/user/interceptors/jwt.interceptor';
import { AuthService } from 'src/user/service/auth/auth.service';

@UseInterceptors(JwtInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Serialize(UserDto)
  @Post('signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Serialize(UserDto)
  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
