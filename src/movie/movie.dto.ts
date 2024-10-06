import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { MovieSessionTimeSlot } from 'src/utils/enums';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  ageRestriction: number;

  @IsArray()
  @IsNotEmpty()
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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  ageRestriction: number;
}
