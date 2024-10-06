import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(Number(id));
    return user;
  }

  @Post()
  //@UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.usersService.deleteById(Number(id));
    return user;
  }
}
