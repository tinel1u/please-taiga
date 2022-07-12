import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DashboardController } from "./dashboard.controller";
import { TicketSchema } from "../tickets/ticket.schema";
import { DashboardService } from "./dashboard.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Ticket", schema: TicketSchema }]),
        UserModule
    ],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
