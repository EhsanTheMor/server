import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUserDecorator = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const currentUser = req.currentUser;

    return currentUser;
  },
);
