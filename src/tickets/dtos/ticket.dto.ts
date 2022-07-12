export class TicketDTO {
    id?: string;
    title: string;
    reference: string;
    content: string;
    creator: string;
    status:
        | "new"
        | "in progress"
        | "ready for test"
        | "closed"
        | "needs info"
        | "rejected"
        | "postponed";
}
