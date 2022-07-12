import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./tickets/auth/auth.module";
import { DashboardModule } from "./tickets/dashboard/dashboard.module";
import { TicketModule } from "./tickets/tickets/ticket.module";
import { UserModule } from "./tickets/user/user.module";

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
