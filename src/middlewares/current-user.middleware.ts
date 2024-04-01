import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { jwtConstants } from 'src/constants/constants';
import { UserService } from 'src/user/service/user/user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // checkes if it has jwt authorization header
    const jwt = req.headers['authorization'];

    if (!jwt) {
      return next();
    }

    // checkes if the token is still valid or not
    const token = jwt.split(' ')[1];
    let user;
    try {
      user = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
    } catch (e) {
      return next();
    }

    // checkes if user exists or not
    const currentUser = await this.userService.getUserByEmail(user.email);
    if (!currentUser) {
      return next();
    }

    req.currentUser = currentUser;

    return next();
  }
}
