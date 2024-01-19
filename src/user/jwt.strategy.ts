import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { jwtConstants } from 'src/constants/constants';
import { User } from './entities/User.entity';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: { id: string, email: string }): Promise<User> {
        const { email } = payload;
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}