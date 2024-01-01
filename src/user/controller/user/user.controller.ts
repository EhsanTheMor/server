import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

@Controller('user')
export class UserController {
  @Get()
  getAllUsers() {
    return 'users';
  }

  @Get('/:id')
  getOneUser(@Param('id') id: number) {
    return 'user';
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return 'user';
  }

  @Patch()
  updateUser() {
    return 'user';
  }
}
