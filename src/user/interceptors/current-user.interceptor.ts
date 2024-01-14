import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class CurrentUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const requst = context.switchToHttp().getRequest();
        const { userId } = requst.headers;

        return next.handle();
    }
}