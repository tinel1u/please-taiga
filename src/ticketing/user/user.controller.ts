import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Res,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Roles } from "../auth/roles/role.decorator";
import { RoleEnum } from "../enums/role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";
import { UserService } from "./user.service";
import { UserDTO } from "../dtos/user.dto";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class UserController {
    // eslint-disable-next-line no-unused-vars
    constructor(private userService: UserService) {}

    @ApiOkResponse({
        status: 200,
        description: "The found users",
        type: UserDTO
    })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({
        status: 403,
        description: "Forbidden ('Admin' role)"
    })
    @Get()
    @Roles(RoleEnum.ADMIN)
    async getUsers(@Res() res) {
        const users = await this.userService.getAllUsers();
        return res.status(HttpStatus.OK).json({
            data: users
        });
    }

    @ApiOkResponse({ status: 200, description: "The found user" })
    @ApiNotFoundResponse({ status: 404, description: "Not found" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({
        status: 403,
        description: "Forbidden ('Admin' role)"
    })
    @Get("/username/:username")
    @Roles(RoleEnum.ADMIN)
    async getUserByUsername(@Res() res, @Param("username") username: string) {
        const user = await this.userService.findByUsername(username);
        return user === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({});
    }
}
