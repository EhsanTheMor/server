import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/service/user/user.service';

@UseGuards(AdminGuard)
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

  // @Patch()
  // updateUser() {
  //   return 'user';
  // TODO: setup update user route
  // }
}
