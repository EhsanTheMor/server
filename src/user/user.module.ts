import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { UserController } from './controller/user/user.controller';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  controllers: [ControllerController, UserController, AuthController],
})
export class UserModule {}
