import { ApiProperty } from "@nestjs/swagger";
import { TicketStatusesEnum } from "../enums/statuses.enum";

export class DashboardDTO {
    @ApiProperty({ name: TicketStatusesEnum.NEW, example: 1 })
    new: number;
    @ApiProperty({ name: TicketStatusesEnum.IN_PROGRESS, example: 3 })
    in_progress: number;
    @ApiProperty({ name: TicketStatusesEnum.READY_FOR_TEST, example: 1 })
    ready_for_test: number;
    @ApiProperty({ name: TicketStatusesEnum.CLOSED, example: 0 })
    closed: number;
    @ApiProperty({ name: TicketStatusesEnum.NEEDS_INFO, example: 1 })
    needs_info: number;
}
