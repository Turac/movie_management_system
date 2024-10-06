import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsEnum,
  IsInt,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { MovieSessionTimeSlot } from 'src/utils/enums';

export class SessionDto {
  @IsString({ message: 'Date of movie should be valid date' })
  @ApiProperty({ example: '02-02-2024', description: 'Date of movie session' })
  date: Date;

  @IsEnum(MovieSessionTimeSlot, {
    message: 'Session Time of movie should be valid time ranges',
    each: true,
  })
  @ApiProperty({ example: '16:00-18:00', description: 'Time of movie session' })
  timeSlot: MovieSessionTimeSlot;

  @IsInt({ message: 'Room number of movie session should be valid number' })
  @ApiProperty({ example: 1200, description: 'Room number of movie session' })
  roomNumber: number;
}

export class CreateMovieDto {
  @IsString({ message: 'Name of movie should be valid string' })
  @IsNotEmpty({ message: 'Name of movie can not be empty' })
  @ApiProperty({ example: 'Dexter', description: 'Name of movie' })
  name: string;

  @IsInt({ message: 'Age Restriction of movie should be valid number' })
  @IsNotEmpty({ message: 'Age Restriction of movie can not be empty' })
  @ApiProperty({ example: 4, description: 'Name of movie' })
  ageRestriction: number;

  @IsArray({ message: 'Session of movie should be valid array' })
  @ValidateNested({ each: true })
  @Type(() => SessionDto)
  @IsNotEmpty({ message: 'Session of movie can not be empty', each: true })
  @ApiProperty({
    example: [{ date: '02-02-2024', timeSlot: '16:00-18:00', roomNumber: 2 }],
    description: 'Session of movie',
  })
  sessions: SessionDto[];
}

export class UpdateMovieDto {
  @IsString({ message: 'Name of movie should be valid string' })
  @IsOptional()
  @ApiProperty({ example: 'Dexter', description: 'Name of movie' })
  name: string;

  @IsInt({ message: 'Age restriction of movie should be valid number' })
  @IsOptional()
  @ApiProperty({ example: 13, description: 'Age restriction for movie' })
  ageRestriction: number;
}
