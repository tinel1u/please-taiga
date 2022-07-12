import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TicketsController } from "./tickets.controller";
import { TicketSchema } from "./ticket.schema";
import { TicketsService } from "./tickets.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Ticket", schema: TicketSchema }]),
        UserModule
    ],
    controllers: [TicketsController],
    providers: [TicketsService],
    exports: [TicketsService]
})
export class TicketModule {}
