import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../dtos/create-user.dto";
import { UsersService } from "../../services/users/users.service";


@Controller('auth')
export class UsersController {

  constructor(private userService: UsersService) {
  }
  @Post('/signup')
  createUser(@Body() body: CreateUserDto){
    this.userService.saveUser(body)
  }
}
