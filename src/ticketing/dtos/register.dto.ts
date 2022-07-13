import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({ name: "email", example: "jdoe@mail.com" })
    email: string;
    @ApiProperty({ name: "password" })
    password: string;
}
