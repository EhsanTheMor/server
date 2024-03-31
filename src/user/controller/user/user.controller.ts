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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUserGuard } from 'src/post/guards/current-user.guard';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/service/user/user.service';

@UseGuards(CurrentUserGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(@Param() param: { limit: number; offset: number }) {
    return this.userService.getAllUsers(param.limit, param.offset);
  }

  @Get('/:id')
  getOneUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    if (body.passwordConfirmation !== body.password) {
      throw new BadRequestException('رمز و تاییدیه رمز همخوانی ندارد.');
    }

    return this.userService.createNewUser(body);
  }

  // @Patch()
  // updateUser() {
  //   return 'user';
  // TODO
  // }
}
