import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES } from 'src/features/user/constants/roles.constants';
import { User } from 'src/features/user/entities/User.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const currentUser: User = req.currentUser;

    if (currentUser.role !== ROLES.ADMID) {
      return false;
    }

    return true;
  }
}
