import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { SessionDto } from 'src/movie/movie.dto';

export class BuyTicketDto {
  @IsNotEmpty({ message: 'Session of movie can not be empty' })
  @IsInt({ message: 'Session of movie should be valid session' })
  @Type(() => SessionDto)
  @ApiProperty({
    example: 2,
    description: 'Session of movie',
  })
  session: SessionDto;
}
