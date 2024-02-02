import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServerResponse } from 'http';
import { Observable, map } from 'rxjs';
import { jwtConstants } from 'src/constants/constants';

export function UseJwt() {
  return UseInterceptors(new JwtInterceptor(new JwtService()));
}

export class JwtInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {

    return next.handle().pipe(
      map((data: any) => {
        const token = this.jwtService.sign(data, { secret: jwtConstants.secret });
        return { access_token: token }
      }),
    );
  }

  extractTokenFromHeader(req: Request): string {
    return req.headers['authorization']?.split(' ')[1];
  }
}
