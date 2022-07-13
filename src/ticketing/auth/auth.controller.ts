import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Roles } from "./roles/role.decorator";
import { RoleEnum } from "../enums/role.enum";
import { RolesGuard } from "./roles/roles.guard";

@ApiTags("Authentication")
@ApiBearerAuth()
@Controller("auth")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class AuthController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private userService: UserService,
        // eslint-disable-next-line no-unused-vars
        private authService: AuthService
    ) {}

    @ApiOkResponse({ status: 200, description: "Token found", type: String })
    @ApiNotFoundResponse({ status: 404, description: "Token not found" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({
        status: 403,
        description: "Forbidden ('Admin' role)"
    })
    @Get("/token/:username")
    @Roles(RoleEnum.ADMIN)
    async getToken(@Res() res, @Param("username") username: string) {
        const user = await this.userService.findByUsername(username);

        const payload = {
            email: user.email
        };

        const token = await this.authService.signPayload(payload);

        return token === undefined
            ? res.status(HttpStatus.NOT_FOUND).json()
            : res.status(HttpStatus.OK).json({
                  status: 200,
                  data: token
              });
    }

    @ApiOkResponse({
        status: 200,
        description: "Registration successful",
        type: String
    })
    @ApiBadRequestResponse({ status: 400, description: "Bad request" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Post("register")
    async register(@Res() res, @Body() registerDTO: RegisterDTO) {
        const user = await this.userService.create(registerDTO);
        const payload = {
            email: user.email
        };

        const token = await this.authService.signPayload(payload);

        return res.status(HttpStatus.OK).json({
            data: { user, token }
        });
    }

    @ApiOkResponse({
        status: 200,
        description: "Login successful",
        type: String
    })
    @ApiNotFoundResponse({ status: 404, description: "User not found" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Post("login")
    async login(@Res() res, @Body() loginDTO: LoginDTO) {
        const user = await this.userService.findByLogin(loginDTO);
        const payload = {
            email: user.email
        };
        const token = await this.authService.signPayload(payload);
        return user && token
            ? res.status(HttpStatus.OK).json({
                  data: token
              })
            : res.status(HttpStatus.NOT_FOUND).json();
    }
}
