import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/features/user/service/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const currentUser = req.currentUser;

    if (!currentUser) return false;

    return true;
  }
}
