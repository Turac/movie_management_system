import { IsNotEmpty, IsNumber } from 'class-validator';
import { SessionDto } from 'src/movie/movie.dto';

export class BuyTicketDto {
  @IsNotEmpty()
  @IsNumber()
  session: SessionDto;
}
