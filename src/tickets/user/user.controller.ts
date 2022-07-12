import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Res,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles/role.decorator";
import { Role } from "../auth/roles/role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";
import { UserService } from "./user.service";

@Controller("users")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class UserController {
    // eslint-disable-next-line no-unused-vars
    constructor(private userService: UserService) {}

    @Get()
    @Roles(Role.Admin)
    async getUsers(@Res() res) {
        const users = await this.userService.getAllUsers();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: users
        });
    }

    @Get("/username/:username")
    @Roles(Role.Admin)
    async getUserByUsername(@Res() res, @Param("username") username) {
        const user = await this.userService.findByUsername(username);
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: user
        });
    }
}
