import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post, Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../dtos/user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @ApiOkResponse({
    type: UserDto,
    isArray: true,
  })
  @Get()
  @ApiQuery({name: 'limit',type: "number"})
  @ApiQuery({name: 'offset',type: "number"})
  @Serialize(UserDto)
  getAllUsers(@Query() param: { limit: number; offset: number } = { limit: 20, offset: 0 }) {
    return this.userService.getAllUsers(param.limit, param.offset);
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @Get('/:id')
  @Serialize(UserDto)
  getOneUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @Post()
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto) {
    if (body.passwordConfirmation !== body.password) {
      throw new BadRequestException('رمز و تاییدیه رمز همخوانی ندارد.');
    }

    return this.userService.createNewUser(body);
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @Patch('/:id')
  @Serialize(UserDto)
  makeUserAdmin(@Param('id') id: number) {
    return this.userService.makeUserAdmin(id);
  }

  // @Patch()
  // updateUser() {
  //   return 'user';
  // TODO: setup update user route
  // }
}
