import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class LoginDto {
  @IsString({ message: 'Username should be valid string' })
  @ApiProperty({ example: 'olivia', description: 'Username' })
  username: string;

  @IsString({ message: 'Password should be valid string' })
  @ApiProperty({ example: 'myPassword', description: 'Password' })
  password: string;
}

export class RegisterDto {
  @IsString({ message: 'Username should be valid string' })
  @ApiProperty({ example: 'olivia', description: 'Username' })
  username: string;

  @IsString({ message: 'Password should be valid string' })
  @ApiProperty({ example: 'myPassword', description: 'Password' })
  password: string;

  @IsInt({ message: 'Age should be valid number' })
  @ApiProperty({ example: 22, description: 'Age of user' })
  age: number;

  @IsEnum(UserRole, { message: 'Role should be either customer or manager' })
  @ApiProperty({
    example: 'customer',
    description: 'Either customer or manager',
  })
  role: UserRole;
}
