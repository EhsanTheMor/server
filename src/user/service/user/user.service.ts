import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  /**
   *
   */
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createNewUser(user: CreateUserDto) {
    //Checks if any one before has signed up with this email.
    const oldUser = await this.userRepo.find({
      where: {
        email: user.email,
      },
    });
    if (oldUser.length > 0) {
      throw new BadRequestException('Email address have been used before.');
    }

    const newUser = this.userRepo.create({
      username: user.username,
      email: user.email,
      imageUrl: user?.imageUrl,
      password: user.password,
    });

    return this.userRepo.save(newUser);
  }

  async getAllUsers(requestLimit?: number, requestOffset?: number) {
    let limit = requestLimit || 20;
    let offset = requestOffset || 0;

    const users = await this.userRepo.find({
      take: limit,
      skip: offset,
    });

    return users;
  }

  async getUserWithEmail(userEmail?: string) {}

  async getUserWithId(userId: number) {
    const user = await this.userRepo.find({ where: { id: userId } });

    return user;
  }
}
