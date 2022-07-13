import { Controller, Get, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Roles } from "../auth/roles/role.decorator";
import { RoleEnum } from "../enums/role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";
import { DashboardService } from "./dashboard.service";
import { DashboardDTO } from "../dtos/dashboard.dto";

@ApiTags("Dashboard")
@Controller("dashboard")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@ApiBearerAuth()
export class DashboardController {
    // eslint-disable-next-line no-unused-vars
    constructor(private dashboardService: DashboardService) {}

    @ApiOkResponse({
        status: 200,
        description: "The found tickets by status",
        type: DashboardDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({
        status: 403,
        description: "Forbidden ('Admin' role)"
    })
    @Get()
    @Roles(RoleEnum.ADMIN)
    async getTicketsByStatus(@Res() res) {
        const ticketsByStatus =
            await this.dashboardService.getTicketsByStatus();
        return res.status(HttpStatus.OK).json({
            data: ticketsByStatus
        });
    }
}
