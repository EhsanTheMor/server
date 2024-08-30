import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignUpDto } from '../../dtos/sign-up.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

class Access{
  access_token: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: Access,
  })
  @Post('/signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @ApiOkResponse({
    type: Access,
  })
  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    //Checks if password and password confirmation is same.
    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException('Please confirms your password.');
    }

    return this.authService.signUp(body);
  }
}
