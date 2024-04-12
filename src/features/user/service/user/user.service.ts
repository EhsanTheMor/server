import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ROLES } from '../../constants/roles.constants';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createNewUser(user: CreateUserDto) {
    //Checks if any one before has signed up with this email.
    const oldUser = await this.getUserByEmail(user.email);
    if (oldUser) {
      throw new BadRequestException('آدرس ایمیل قبلا استفاده شده است.');
    }

    const newUser = this.userRepo.create({
      username: user.username,
      email: user.email,
      imageUrl: user?.imageUrl,
      password: user.password,
      role: ROLES.USER,
    });

    return this.userRepo.save(newUser);
  }

  async getAllUsers(limit: number, offset: number) {
    const users = await this.userRepo.find({
      take: limit,
      skip: offset,
    });

    return users;
  }

  async getUserByEmail(userEmail?: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        email: userEmail,
      },
    });

    return user;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('کاربری با این مشخصات وجود ندارد.');
    }

    return user;
  }

  async updateUserBuyOtherModules(user: User) {
    return this.userRepo.save(user);
  }

  async makeUserAdmin(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    user.role = 'ADMIN';

    return this.userRepo.save(user);
  }
}
