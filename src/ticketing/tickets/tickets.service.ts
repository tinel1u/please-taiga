import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "../interfaces/ticket.interface";
import { TicketToCreateDTO } from "../dtos/ticket-to-create.dto";
import { TicketToUpdateDTO } from "../dtos/ticket-to-update.dto";

@Injectable()
export class TicketsService {
    constructor(
        // eslint-disable-next-line no-unused-vars
        @InjectModel("Ticket") private readonly ticketModel: Model<Ticket>
    ) {}

    async create(
        username: string,
        createTicketDTO: TicketToCreateDTO
    ): Promise<Ticket> {
        const newTicket = await new this.ticketModel({
            ...createTicketDTO,
            creator: username
        });
        return newTicket.save();
    }

    async delete(_id): Promise<boolean> {
        const ticket = await this.ticketModel.findByIdAndRemove(_id);
        return ticket !== undefined;
    }

    async getAll(): Promise<Ticket[]> {
        const tickets = await this.ticketModel.find().exec();
        return tickets;
    }

    async getByReference(reference): Promise<Ticket[]> {
        const ticket = await this.ticketModel
            .find({ reference: reference })
            .exec();
        return ticket;
    }

    async getAllByTitle(title): Promise<Ticket[]> {
        const tickets = await this.ticketModel.find({ title: title }).exec();
        return tickets;
    }

    async getAllByContent(content): Promise<Ticket[]> {
        const tickets = await this.ticketModel
            .find({ content: content })
            .exec();
        return tickets;
    }

    async getAllByCreator(creator): Promise<Ticket[]> {
        const tickets = await this.ticketModel
            .find({ creator: creator })
            .exec();
        return tickets;
    }

    async getById(id): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(id).exec();
        return ticket;
    }

    async update(_id, updateTicketDTO: TicketToUpdateDTO): Promise<boolean> {
        const ticket = await this.ticketModel.findByIdAndUpdate(
            _id,
            updateTicketDTO,
            { new: true }
        );
        return ticket !== undefined;
    }
}
