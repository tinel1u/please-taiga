import { ApiProperty } from "@nestjs/swagger";

export class DashboardDTO {
    @ApiProperty({ name: "new", example: 1 })
    new: number;
    @ApiProperty({ name: "in_progress", example: 3 })
    in_progress: number;
    @ApiProperty({ name: "ready_for_test", example: 1 })
    ready_for_test: number;
    @ApiProperty({ name: "closed", example: 0 })
    closed: number;
    @ApiProperty({ name: "needs_info", example: 1 })
    needs_info: number;
    @ApiProperty({ name: "rejected", example: 1 })
    rejected: number;
    @ApiProperty({ name: "postponed", example: 0 })
    postponed: number;
}
