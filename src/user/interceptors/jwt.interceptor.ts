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
  constructor(private jwtService: JwtService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const incomingReq = context.switchToHttp().getRequest<Request>();
    const authToken = this.extractTokenFromHeader(incomingReq);
    try {
      const result = this.jwtService.verify(authToken.toString(), {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      console.log(error.message);
    }

    //Attach data to the headers.
    return next.handle().pipe(
      map((data: any) => {
        const request = context.switchToHttp().getResponse<ServerResponse>();
        return data;
      }),
    );
  }

  extractTokenFromHeader(req: Request): string {
    return req.headers['authorization']?.split(' ')[1];
  }
}
