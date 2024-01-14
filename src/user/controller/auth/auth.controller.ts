import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SignInDto } from 'src/user/dtos/sign-in.dto';
import { SignUpDto } from 'src/user/dtos/sign-up.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthService } from 'src/user/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

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
