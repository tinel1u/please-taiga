import { ApiProperty } from "@nestjs/swagger";
import { TicketStatusesEnum } from "../enums/statuses.enum";

export class TicketDTO {
    @ApiProperty({ name: "id", example: "62cd5d37314d1125018be763" })
    id?: string;
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
    @ApiProperty({ name: "creator", example: "johndoe" })
    creator: string;
    @ApiProperty({
        name: "status",
        enum: TicketStatusesEnum,
        default: TicketStatusesEnum.NEW
    })
    status: TicketStatusesEnum;
}
