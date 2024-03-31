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
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers['authorization'];
    console.log(jwt);

    if (!jwt) {
      next();
    } else {
      const [_, token] = jwt?.split(' ');

      if (token) {
        const user = await this.jwtService.verify(token, {
          secret: jwtConstants.secret,
        });
        req.currentUser = user;
      }

      next();
    }
  }
}
