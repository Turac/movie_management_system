import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
    try {
      const savedUser = await this.userRepository.save({
        username: createUserDto.username,
        password: createUserDto.password,
        age: createUserDto.age,
        role: createUserDto.role,
        createdDate: new Date(),
      });
      if (savedUser) return savedUser;
      throw new BadRequestException('User could not be registered');
    } catch (e) {
      throw new BadRequestException('User could not be registered');
    }
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
