import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TicketsController } from "../controllers/tickets.controller";
import { TicketSchema } from "../schemas/ticket.schema";
import { TicketsService } from "../services/tickets.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Ticket", schema: TicketSchema }])
    ],
    controllers: [TicketsController],
    providers: [TicketsService]
})
export class TicketModule {}
