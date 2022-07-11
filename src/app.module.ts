import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsController } from './tickets/tickets/tickets.controller';

@Module({
  imports: [],
  controllers: [AppController, TicketsController],
  providers: [AppService],
})
export class AppModule {}
