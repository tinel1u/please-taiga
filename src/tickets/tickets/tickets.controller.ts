import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { TicketDTO } from '../ticket.dto'
import { tickets } from 'todos-mock'

let ticketsData = tickets

@Controller('tickets')
export class TicketsController {
    @Get()
    getTickets(): TicketDTO[] {
        return ticketsData
    }

    @Post() createTicket(@Body() createTicket: TicketDTO): TicketDTO {
        const newId = (ticketsData.length + 1).toString()
        const newTicket: TicketDTO = {
            id: newId,
            title: createTicket.title.concat(' ' + newId),
            reference: newId,
            ...createTicket,
        }

        ticketsData = [...ticketsData, newTicket]

        return newTicket
    }

    @Put(':id') updateTicket(
        @Body() updateTicket: TicketDTO,
        @Param('id') id
    ): TicketDTO {
        ticketsData = ticketsData.map((ticket) =>
            ticket.id === id ? updateTicket : ticket
        )
        return updateTicket
    }

    @Delete(':id') deleteTicket(@Param('id') id): boolean {
        const index = ticketsData.findIndex((ticket) => ticket.id === id)

        if (index !== -1) {
            ticketsData.splice(index, 1)
            return true
        } else {
            return false
        }
    }
}
