import { IsString, IsInt, IsIn } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  age: number;

  @IsIn([UserRole])
  role: UserRole;
}
