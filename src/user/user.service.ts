import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/auth.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

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

  async createUser(createUserDto: RegisterDto) {
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
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
