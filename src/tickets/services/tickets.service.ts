import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "../interfaces/ticket.interface";
import { TicketDTO } from "../dtos/ticket.dto";
import { DashboardDTO } from "../dtos/dashboard.dto";

@Injectable()
export class TicketsService {
    constructor(
        // eslint-disable-next-line no-unused-vars
        @InjectModel("Ticket") private readonly ticketModel: Model<Ticket>
    ) {}

    async createATicket(createTicketDTO: TicketDTO): Promise<Ticket> {
        const newTicket = await new this.ticketModel(createTicketDTO);
        return newTicket.save();
    }

    async getAllTickets(): Promise<Ticket[]> {
        const tickets = await this.ticketModel.find().exec();
        return tickets;
    }

    async getTicketsByStatus(): Promise<any> {
        const tickets = await this.ticketModel.find().exec();

        const dashboardMetrics = new DashboardDTO();

        dashboardMetrics.new = tickets.filter(
            (ticket) => ticket.status === "new"
        ).length;
        dashboardMetrics.in_progress = tickets.filter(
            (ticket) => ticket.status === "in_progress"
        ).length;
        dashboardMetrics.ready_for_test = tickets.filter(
            (ticket) => ticket.status === "ready_for_test"
        ).length;
        dashboardMetrics.closed = tickets.filter(
            (ticket) => ticket.status === "closed"
        ).length;
        dashboardMetrics.needs_info = tickets.filter(
            (ticket) => ticket.status === "needs_info"
        ).length;
        dashboardMetrics.rejected = tickets.filter(
            (ticket) => ticket.status === "rejected"
        ).length;
        dashboardMetrics.postponed = tickets.filter(
            (ticket) => ticket.status === "postponed"
        ).length;

        return dashboardMetrics;
    }

    async getATicket(ticketId): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(ticketId).exec();
        return ticket;
    }

    async updateATicket(_id, updateTicketDTO: TicketDTO): Promise<Ticket> {
        const ticket = await this.ticketModel.findByIdAndUpdate(
            _id,
            updateTicketDTO,
            { new: true }
        );
        return ticket;
    }

    async deleteATicket(_id): Promise<any> {
        const ticket = await this.ticketModel.findByIdAndRemove(_id);
        return ticket;
    }
}
