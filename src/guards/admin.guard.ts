import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES } from 'src/user/constants/roles.constants';
import { User } from 'src/user/entities/User.entity';
import { UserService } from 'src/user/service/user/user.service';

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
