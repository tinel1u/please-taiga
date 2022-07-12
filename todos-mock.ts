import { TicketDTO } from "src/tickets/dtos/ticket.dto";

export const tickets: TicketDTO[] = [
    {
        id: "1",
        title: "ticket 1",
        reference: "1",
        content: "My first ticket",
        creator: "Me",
        status: "new"
    },
    {
        id: "2",
        title: "ticket 2",
        reference: "2",
        content: "My second ticket",
        creator: "Me",
        status: "new"
    },
    {
        id: "3",
        title: "ticket 3",
        reference: "3",
        content: "My third ticket",
        creator: "Me",
        status: "new"
    },
    {
        id: "4",
        title: "ticket 4",
        reference: "4",
        content: "My fourth ticket",
        creator: "Me",
        status: "new"
    },
    {
        id: "5",
        title: "ticket 5",
        reference: "5",
        content: "My fifth ticket",
        creator: "Someone",
        status: "in progress"
    }
];
