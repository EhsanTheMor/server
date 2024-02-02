import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth/auth.controller';
import { UserController } from './controller/user/user.controller';
import { User } from './entities/User.entity';
import { AuthService } from './service/auth/auth.service';
import { UserService } from './service/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  exports: [UserService]
})
export class UserModule { }
