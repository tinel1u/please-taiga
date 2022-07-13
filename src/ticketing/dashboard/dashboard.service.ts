import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "../interfaces/ticket.interface";
import { DashboardDTO } from "../dtos/dashboard.dto";
import { TicketStatusesEnum } from "../enums/statuses.enum";

@Injectable()
export class DashboardService {
    constructor(
        // eslint-disable-next-line no-unused-vars
        @InjectModel("Ticket") private readonly ticketModel: Model<Ticket>
    ) {}

    async getTicketsByStatus(): Promise<DashboardDTO> {
        const tickets = await this.ticketModel.find().exec();

        const dashboardMetrics = new DashboardDTO();

        dashboardMetrics.new = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.NEW
        ).length;
        dashboardMetrics.in_progress = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.IN_PROGRESS
        ).length;
        dashboardMetrics.ready_for_test = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.READY_FOR_TEST
        ).length;
        dashboardMetrics.closed = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.CLOSED
        ).length;
        dashboardMetrics.needs_info = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.NEEDS_INFO
        ).length;
        dashboardMetrics.rejected = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.REJECTED
        ).length;
        dashboardMetrics.postponed = tickets.filter(
            (ticket) => ticket.status === TicketStatusesEnum.POSTPONED
        ).length;

        return dashboardMetrics;
    }
}
