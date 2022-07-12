import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DashboardController } from "../controllers/dashboard.controller";
import { TicketSchema } from "../schemas/ticket.schema";
import { DashboardService } from "../services/dashboard.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Ticket", schema: TicketSchema }])
    ],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
