import { ApiProperty } from "@nestjs/swagger";
import { TicketStatusesEnum } from "../enums/statuses.enum";

export class TicketToCreateDTO {
    @ApiProperty({ name: "title", example: "FirstTicket" })
    title: string;
    @ApiProperty({ name: "reference", example: "1" })
    reference: string;
    @ApiProperty({
        name: "content",
        example: "My first ticket",
        required: false
    })
    content: string;
    @ApiProperty({
        name: "status",
        enum: TicketStatusesEnum,
        default: TicketStatusesEnum.NEW,
        required: false
    })
    status: TicketStatusesEnum;
}
