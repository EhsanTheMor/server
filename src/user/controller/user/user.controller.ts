import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { CurrentUserInterceptor } from 'src/user/interceptors/current-user.interceptor';
import { JwtInterceptor } from 'src/user/interceptors/jwt.interceptor';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(JwtInterceptor)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get('/:id')
  getOneUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createNewUser(body);
  }

  @Patch()
  updateUser() {
    return 'user';
  }
}
