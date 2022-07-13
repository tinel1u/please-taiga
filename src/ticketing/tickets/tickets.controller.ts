import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Roles } from "../auth/roles/role.decorator";
import { RoleEnum } from "../enums/role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";
import { TicketDTO } from "../dtos/ticket.dto";
import { TicketsService } from "./tickets.service";
import { TicketToCreateDTO } from "../dtos/ticket-to-create.dto";
import { TicketToUpdateDTO } from "../dtos/ticket-to-update.dto";

@ApiTags("Tickets")
@ApiBearerAuth()
@Controller("tickets")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class TicketsController {
    // eslint-disable-next-line no-unused-vars
    constructor(private ticketService: TicketsService) {}

    @ApiOkResponse({
        status: 200,
        description: "The found tickets",
        type: TicketDTO,
        isArray: true
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Get()
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async getTickets(@Res() res) {
        const tickets = await this.ticketService.getAll();
        return res.status(HttpStatus.OK).json({
            data: tickets
        });
    }

    @ApiOkResponse({
        status: 200,
        description: "The found ticket",
        type: TicketDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @ApiNotFoundResponse({ status: 404, description: "Ticket not found" })
    @Get("/reference/:reference")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async getTicketByReference(
        @Res() res,
        @Param("reference") reference: string
    ) {
        const ticket = await this.ticketService.getByReference(reference);

        if (!ticket) {
            return res.status(HttpStatus.NOT_FOUND).json();
        }

        return ticket === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({ data: ticket });
    }

    @ApiOkResponse({
        status: 200,
        description: "The found ticket",
        type: TicketDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Get("/title/:title")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async getTicketsByTitle(@Res() res, @Param("title") title: string) {
        const tickets = await this.ticketService.getAllByTitle(title);
        return res.status(HttpStatus.OK).json({ data: tickets });
    }

    @ApiOkResponse({
        status: 200,
        description: "The found ticket",
        type: TicketDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Get("/content/:content")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async getTicketsByContent(@Res() res, @Param("content") content: string) {
        const tickets = await this.ticketService.getAllByContent(content);
        return res.status(HttpStatus.OK).json({ data: tickets });
    }

    @ApiOkResponse({
        status: 200,
        description: "The found ticket",
        type: TicketDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Get("/creator/:creator")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async getTicketsByCreator(@Res() res, @Param("creator") creator: string) {
        const tickets = await this.ticketService.getAllByCreator(creator);
        return res.status(HttpStatus.OK).json({ data: tickets });
    }

    @ApiOkResponse({
        status: 200,
        description: "The found ticket",
        type: TicketDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @ApiNotFoundResponse({ status: 404, description: "Ticket not found" })
    @Get(":id")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async getTicketById(@Res() res, @Param("id") id: string) {
        const ticket = await this.ticketService.getById(id);

        return !ticket
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({
                  data: ticket
              });
    }

    @ApiCreatedResponse({
        status: 201,
        description: "Ticket successfully created",
        type: TicketDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Post()
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async createTicket(
        @Res() res,
        @Body() ticketToCreateDTO: TicketToCreateDTO,
        @Req() request
    ) {
        const ticket = await this.ticketService.create(
            request?.user?.username,
            ticketToCreateDTO
        );

        return res.status(HttpStatus.CREATED).json({
            ticket
        });
    }

    @ApiNoContentResponse({
        status: 204,
        description: "Ticket successfully updated"
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @ApiNotFoundResponse({ status: 404, description: "Ticket not found" })
    @Patch(":id")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async updateTicket(
        @Res() res,
        @Body() updateTicket: TicketToUpdateDTO,
        @Param("id") id: string
    ) {
        const ticket = await this.ticketService.getById(id);

        if (!ticket) {
            return res.status(HttpStatus.NOT_FOUND).json();
        }

        const isUpdated = await this.ticketService.update(id, updateTicket);
        return isUpdated !== true
            ? res.status(HttpStatus.BAD_REQUEST).json()
            : res.status(HttpStatus.NO_CONTENT).json({});
    }

    @ApiNoContentResponse({
        status: 204,
        description: "Ticket successfully deleted"
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @ApiNotFoundResponse({ status: 404, description: "Ticket not found" })
    @Delete(":id")
    @Roles(RoleEnum.ADMIN, RoleEnum.USER)
    async deleteTicket(@Res() res, @Param("id") id: string) {
        const ticket = await this.ticketService.getById(id);

        if (!ticket) {
            return res.status(HttpStatus.NOT_FOUND).json();
        }

        const isDeleted = await this.ticketService.delete(id);
        return isDeleted !== true
            ? res.status(HttpStatus.BAD_REQUEST).json()
            : res.status(HttpStatus.NO_CONTENT).json();
    }
}
