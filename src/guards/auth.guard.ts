import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const currentUser = req.currentUser;
    console.log(currentUser);

    if (!currentUser) return false;

    const user = await this.userService.getUserByEmail(currentUser.email);

    if (!user) return false;
    if (user.role !== 'admin') return false;

    return true;
  }
}
