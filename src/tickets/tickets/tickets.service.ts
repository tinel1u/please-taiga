import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "../interfaces/ticket.interface";
import { TicketDTO } from "../dtos/ticket.dto";

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

    async getTicketByReference(reference): Promise<any> {
        const ticket = await this.ticketModel
            .find({ reference: reference })
            .exec();
        return ticket;
    }

    async getTicketsByTitle(title): Promise<any> {
        const tickets = await this.ticketModel.find({ title: title }).exec();
        return tickets;
    }

    async getTicketsByContent(content): Promise<any> {
        const tickets = await this.ticketModel
            .find({ content: content })
            .exec();
        return tickets;
    }

    async getTicketsByCreator(creator): Promise<any> {
        const tickets = await this.ticketModel
            .find({ creator: creator })
            .exec();
        return tickets;
    }

    async getATicket(id): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(id).exec();
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
