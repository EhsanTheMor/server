import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/user/dtos/sign-in.dto';
import { SignUpDto } from 'src/user/dtos/sign-up.dto';
import { AuthService } from 'src/user/service/auth/auth.service';
import { UserService } from 'src/user/service/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    //Checks if password and password confirmation is same.
    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException('Please confirms your password.');
    }

    return this.authService.signUp(body);
  }
}
