import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { DashboardService } from "../services/dashboard.service";

@Controller("dashboard")
export class DashboardController {
    // eslint-disable-next-line no-unused-vars
    constructor(private dashboardService: DashboardService) {}

    @Get()
    async getTicketsByStatus(@Res() res) {
        const ticketsByStatus =
            await this.dashboardService.getTicketsByStatus();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: ticketsByStatus
        });
    }
}
