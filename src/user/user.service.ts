import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = this.userRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save({
      username: createUserDto.username,
      password: createUserDto.password,
      age: createUserDto.age,
      role: createUserDto.role,
      createdDate: new Date(),
    });
    return newUser;
  }

  async deleteById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.userRepository.remove(user);
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }
}
