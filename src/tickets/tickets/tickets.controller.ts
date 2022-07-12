import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Res,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles/role.decorator";
import { Role } from "../auth/roles/role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";
import { TicketDTO } from "../dtos/ticket.dto";
import { TicketsService } from "./tickets.service";

@Controller("tickets")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class TicketsController {
    // eslint-disable-next-line no-unused-vars
    constructor(private ticketService: TicketsService) {}

    @Get()
    @Roles(Role.Admin, Role.User)
    async getTickets(@Res() res) {
        const tickets = await this.ticketService.getAllTickets();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: tickets
        });
    }

    @Get("/reference/:reference")
    @Roles(Role.Admin, Role.User)
    async getTicketByReference(
        @Res() res,
        @Param("reference") reference: string
    ) {
        const ticket = await this.ticketService.getTicketByReference(
            reference?.toLowerCase
        );
        ticket === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({ data: ticket });
    }

    @Get("/title/:title")
    @Roles(Role.Admin, Role.User)
    async getTicketsByTitle(@Res() res, @Param("title") title: string) {
        const tickets = await this.ticketService.getTicketsByTitle(
            title?.toLowerCase
        );
        tickets === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({ data: tickets });
    }

    @Get("/content/:content")
    @Roles(Role.Admin, Role.User)
    async getTicketsByContent(@Res() res, @Param("content") content: string) {
        const tickets = await this.ticketService.getTicketsByContent(
            content?.toLowerCase
        );
        tickets === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({ data: tickets });
    }

    @Get("/creator/:creator")
    @Roles(Role.Admin, Role.User)
    async getTicketsByCreator(@Res() res, @Param("creator") creator: string) {
        const tickets = await this.ticketService.getTicketsByCreator(
            creator?.toLowerCase
        );
        tickets === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({ data: tickets });
    }

    @Get(":id")
    @Roles(Role.Admin, Role.User)
    async getTicketById(@Res() res, @Param("id") id) {
        const tickets = await this.ticketService.getATicket(id);
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: tickets
        });
    }

    @Post()
    @Roles(Role.Admin, Role.User)
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
    @Roles(Role.Admin, Role.User)
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

    @Delete(":id")
    @Roles(Role.Admin, Role.User)
    async deleteTicket(@Res() res, @Param("id") id) {
        const ticket = await this.ticketService.deleteATicket(id);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Ticket has been deleted",
            data: ticket
        });
    }
}
