import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/user/dtos/sign-in.dto';
import { SignUpDto } from 'src/user/dtos/sign-up.dto';
import { UseJwt } from 'src/user/interceptors/jwt.interceptor';
import { AuthService } from 'src/user/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signin')
  @UseJwt()
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
