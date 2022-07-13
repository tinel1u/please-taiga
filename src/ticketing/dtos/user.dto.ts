import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../enums/role.enum";

export class UserDTO {
    @ApiProperty({ name: "email", example: "johndoe@mail.com" })
    email: string;
    @ApiProperty({ name: "password" })
    password: string;
    @ApiProperty({ name: "role", enum: RoleEnum })
    role: RoleEnum[];
    @ApiProperty({ name: "username", example: "jdoe" })
    username: string;
}
