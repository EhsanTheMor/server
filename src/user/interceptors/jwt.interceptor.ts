import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ServerResponse } from 'http';
import { Observable, map } from 'rxjs';

export class JwtInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //Attach data to the headers.
    return next.handle().pipe(
      map((data: any) => {
        const headers = context
          .switchToHttp()
          .getResponse<ServerResponse>()
          .setHeader('jwt', 'Berear');

        return data;
      }),
    );
  }
}
