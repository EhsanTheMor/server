import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../dtos/user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Serialize(UserDto)
  getAllUsers(@Param() param: { limit: number; offset: number }) {
    return this.userService.getAllUsers(param.limit, param.offset);
  }

  @Get('/:id')
  @Serialize(UserDto)
  getOneUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto) {
    if (body.passwordConfirmation !== body.password) {
      throw new BadRequestException('رمز و تاییدیه رمز همخوانی ندارد.');
    }

    return this.userService.createNewUser(body);
  }

  @Patch('/:id')
  makeUserAdmin(@Param('id') id: number) {
    return this.userService.makeUserAdmin(id);
  }

  // @Patch()
  // updateUser() {
  //   return 'user';
  // TODO: setup update user route
  // }
}
