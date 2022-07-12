import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DashboardModule } from "./tickets/modules/dashboard.module";
import { TicketModule } from "./tickets/modules/ticket.module";

@Module({
    imports: [
        MongooseModule.forRoot(
            "mongodb+srv://main-user-2:AanGWzyfPHSbaBRzQL@cluster0.zzqw4ah.mongodb.net/?retryWrites=true&w=majority"
        ),
        TicketModule,
        DashboardModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
