import { BadRequestException, Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { SignUpDto } from 'src/user/dtos/sign-up.dto';
import { promisify } from 'util';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from 'src/user/constants/roles.constants';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Email or password is not right');
    }

    const [salt, userPassword] = user.password.split('.');
    const providedPasswordBuffer = (await scrypt(password, salt, 32)) as Buffer;
    const providedPassword = providedPasswordBuffer.toString('hex');

    if (providedPassword === userPassword) {
      return {
        access_token: this.jwtService.sign({ id: user.id, email: user.email }),
      };
    } else {
      throw new BadRequestException('Email or password is not right');
    }
  }

  async signUp(userReq: SignUpDto) {
    //Hashes the password.
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userReq.password, salt, 32)) as Buffer;
    const newPassword = salt + '.' + hash.toString('hex');

    const user = await this.userService.createNewUser({
      ...userReq,
      password: newPassword,
      role: ROLES.USER,
    });

    return {
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
