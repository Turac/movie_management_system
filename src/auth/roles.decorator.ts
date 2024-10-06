import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.entity';

//TODO: move them proper folders.. they are not auth
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
