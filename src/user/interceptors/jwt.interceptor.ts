import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServerResponse } from 'http';
import { Observable, map } from 'rxjs';

export class JwtInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //Attach data to the headers.
    return next.handle().pipe(
      map((data: any) => {
        const request = context.switchToHttp().getResponse<ServerResponse>();
        request.setHeader('Authorization', 'Bearer ');
        return data;
      }),
    );
  }
}
