import { Controller, Get, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles/role.decorator";
import { Role } from "../auth/roles/role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class DashboardController {
    // eslint-disable-next-line no-unused-vars
    constructor(private dashboardService: DashboardService) {}

    @Get()
    @Roles(Role.Admin)
    async getTicketsByStatus(@Res() res) {
        const ticketsByStatus =
            await this.dashboardService.getTicketsByStatus();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: ticketsByStatus
        });
    }
}
