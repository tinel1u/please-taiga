import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Res
} from "@nestjs/common";
import { TicketDTO } from "../dtos/ticket.dto";
import { TicketsService } from "../services/tickets.service";

@Controller("tickets")
export class TicketsController {
    // eslint-disable-next-line no-unused-vars
    constructor(private ticketService: TicketsService) {}

    @Get()
    async getTickets(@Res() res) {
        const tickets = await this.ticketService.getAllTickets();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: tickets
        });
    }

    @Get()
    async getTicketsByStatus(@Res() res) {
        const ticketsByStatus = await this.ticketService.getTicketsByStatus();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: ticketsByStatus
        });
    }

    @Get(":id")
    async getTicket(@Res() res, @Param("id") id) {
        const tickets = await this.ticketService.getATicket(id);
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: tickets
        });
    }

    @Post()
    async createTicket(@Res() res, @Body() ticketToCreateDTO: TicketDTO) {
        const ticket = await this.ticketService.createATicket(
            ticketToCreateDTO
        );
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Ticket has been created",
            data: ticket
        });
    }

    @Patch(":id")
    async updateTicket(
        @Res() res,
        @Body() updateTicket: TicketDTO,
        @Param("id") id
    ) {
        const ticket = await this.ticketService.updateATicket(id, updateTicket);
        return res.status(HttpStatus.OK).json({
            status: 200,
            message: "Ticket has been updated",
            data: ticket
        });
    }

    @Delete(":id") async deleteTicket(@Res() res, @Param("id") id) {
        const ticket = await this.ticketService.deleteATicket(id);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Ticket has been deleted",
            data: ticket
        });
    }
}
