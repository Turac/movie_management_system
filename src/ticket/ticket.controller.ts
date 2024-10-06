import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { BuyTicketDto as buyTicketDto } from './ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserRole } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles, JwtUserPayload } from 'src/utils/roles.decorator';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('buy')
  async buyTicket(@Body() buyTicket: buyTicketDto) {
    return this.ticketService.createTicket(buyTicket);
  }

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getTicket(@Param('id') id: number) {
    return this.ticketService.getTicketById(id);
  }

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('watch/:id')
  async watchTicket(
    @Param('id') id: number,
    @Req() req: { user: JwtUserPayload },
  ) {
    const userId = req.user['userId'];
    return this.ticketService.watchTicketById(id, userId);
  }

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async getWatchList(@Req() req: { user: JwtUserPayload }) {
    const userId = req.user['userId'];
    return this.ticketService.getWatchHistory(userId);
  }
}
