import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: RegisterDto) {
    const alreadyExsist = await this.userService.getUserByUsername(
      createUserDto.username,
    );
    if (alreadyExsist) {
      throw new ConflictException('Username already exsist');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const savedUser = await this.userService.createUser(createUserDto);
    if (savedUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...returnUser } = savedUser;
      return returnUser;
    } else {
      throw new BadRequestException('Could not register user');
    }
  }
}
