import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.userService.getUserByUsername(username);
    console.log(user);
    if (user && password === user.password) {
      const { password, ...result } = user; //not put password to object
      console.log(result);
      return result;
    }
    //TODO: make password hash to compare
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  async login(user: any) {
    console.log('user login method');
    console.log(user);
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //TODO: register and create user should be work same... hash/not hash cases
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    return this.userService.createUser(createUserDto);
  }
}
