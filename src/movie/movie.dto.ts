import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { MovieSessionTimeSlot } from './entities/session.entity';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  ageRestriction: number;

  @IsArray()
  sessions: SessionDto[];
}

export class SessionDto {
  @IsString()
  date: Date;

  @IsEnum(MovieSessionTimeSlot)
  timeSlot: MovieSessionTimeSlot;

  @IsNumber()
  roomNumber: number;
}

export class UpdateMovieDto {
  //TODO: update part should be comprehensive
  @IsString()
  @IsNotEmpty()
  name: string;
}
