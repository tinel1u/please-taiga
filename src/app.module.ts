import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./ticketing/auth/auth.module";
import { DashboardModule } from "./ticketing/dashboard/dashboard.module";
import { TicketModule } from "./ticketing/tickets/ticket.module";
import { UserModule } from "./ticketing/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URI),
        TicketModule,
        DashboardModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
