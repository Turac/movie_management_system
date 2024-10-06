import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { BuyTicketDto } from './ticket.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private userService: UserService,
  ) {}

  async createTicket(
    userId: number,
    createTicketDto: BuyTicketDto,
  ): Promise<Partial<Ticket>> {
    //Check user
    const buyer = await this.userService.getUserById(userId);

    const ticket = this.ticketRepository.create(createTicketDto);
    ticket.purchaseDate = new Date();
    ticket.user = buyer;
    const savedTicket = await this.ticketRepository.save(ticket); //password should be not be mapped
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...result } = savedTicket;
    return result;
  }

  async getTicketById(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async watchTicketById(id: number, userId: number): Promise<Ticket> {
    const user = await this.userService.getUserById(userId);
    const ticket = await this.ticketRepository.findOne({ where: { id, user } });

    if (ticket && !ticket.watched) {
      ticket.watched = true;
      return this.ticketRepository.save(ticket);
    }
    throw new NotFoundException('Valid ticket not found');
  }

  async getWatchHistory(userId: number): Promise<Ticket[]> {
    const user = await this.userService.getUserById(userId);
    const watched = true;
    const ticket = await this.ticketRepository.find({
      where: { user, watched },
    });
    return ticket;
  }
}
