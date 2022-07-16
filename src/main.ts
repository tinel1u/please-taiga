import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { TicketModule } from "./ticketing/tickets/ticket.module";
import { UserModule } from "./ticketing/user/user.module";
import { DashboardModule } from "./ticketing/dashboard/dashboard.module";
import { AuthModule } from "./ticketing/auth/auth.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.setGlobalPrefix("api/v1");

    const options = new DocumentBuilder()
        .setTitle("Taiga ticketing app")
        .setDescription("A documentation for tickets")
        .setVersion("1.0")
        .addTag("Authentication")
        .addTag("Dashboard")
        .addTag("Tickets")
        .addTag("Users")
        .addBearerAuth()
        .build();
    const apppDocument = SwaggerModule.createDocument(app, options, {
        include: [AuthModule, DashboardModule, TicketModule, UserModule]
    });
    SwaggerModule.setup("api", app, apppDocument);
    await app.listen(3000);
}
bootstrap();
