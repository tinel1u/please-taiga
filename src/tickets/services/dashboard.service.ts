import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "../interfaces/ticket.interface";
import { DashboardDTO } from "../dtos/dashboard.dto";

@Injectable()
export class DashboardService {
    constructor(
        // eslint-disable-next-line no-unused-vars
        @InjectModel("Ticket") private readonly ticketModel: Model<Ticket>
    ) {}

    async getTicketsByStatus(): Promise<any> {
        const tickets = await this.ticketModel.find().exec();

        const dashboardMetrics = new DashboardDTO();

        dashboardMetrics.new = tickets.filter(
            (ticket) => ticket.status === "new"
        ).length;
        dashboardMetrics.in_progress = tickets.filter(
            (ticket) => ticket.status === "in progress"
        ).length;
        dashboardMetrics.ready_for_test = tickets.filter(
            (ticket) => ticket.status === "ready for test"
        ).length;
        dashboardMetrics.closed = tickets.filter(
            (ticket) => ticket.status === "closed"
        ).length;
        dashboardMetrics.needs_info = tickets.filter(
            (ticket) => ticket.status === "needs info"
        ).length;
        dashboardMetrics.rejected = tickets.filter(
            (ticket) => ticket.status === "rejected"
        ).length;
        dashboardMetrics.postponed = tickets.filter(
            (ticket) => ticket.status === "postponed"
        ).length;

        return dashboardMetrics;
    }
}
