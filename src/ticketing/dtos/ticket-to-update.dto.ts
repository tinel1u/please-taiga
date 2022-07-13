import { ApiProperty } from "@nestjs/swagger";
import { TicketStatusesEnum } from "../enums/statuses.enum";

export class TicketToUpdateDTO {
    @ApiProperty({ name: "title", example: "FirstTicket", required: false })
    title: string;
    @ApiProperty({ name: "reference", example: "1", required: false })
    reference: string;
    @ApiProperty({
        name: "content",
        example: "My first ticket",
        required: false
    })
    content: string;
    @ApiProperty({ name: "creator", example: "johndoe", required: false })
    creator: string;
    @ApiProperty({ name: "status", enum: TicketStatusesEnum, required: false })
    status: TicketStatusesEnum;
}
