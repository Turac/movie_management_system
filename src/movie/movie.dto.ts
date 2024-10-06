import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  ageRestriction: number;

  @IsArray()
  sessions: string[];
}

export class SessionDto {
  @IsString()
  date: string;

  @IsString()
  timeSlot: string;

  @IsString()
  roomNumber: string;
}

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
