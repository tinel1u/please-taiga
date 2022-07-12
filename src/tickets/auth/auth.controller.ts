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
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Roles } from "./roles/role.decorator";
import { Role } from "./roles/role.enum";
import { RolesGuard } from "./roles/roles.guard";

@Controller("auth")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class AuthController {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private userService: UserService,
        // eslint-disable-next-line no-unused-vars
        private authService: AuthService
    ) {}

    @Get("/token/:username")
    @Roles(Role.Admin)
    async getToken(@Res() res, @Param("username") username) {
        const user = await this.userService.findByUsername(username);

        const payload = {
            email: user.email
        };

        const token = await this.authService.signPayload(payload);

        return res.status(HttpStatus.OK).json({
            status: 200,
            data: token
        });
    }

    @Post("register")
    async register(@Body() registerDTO: RegisterDTO) {
        const user = await this.userService.create(registerDTO);
        const payload = {
            email: user.email
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post("login")
    async login(@Body() loginDTO: LoginDTO) {
        const user = await this.userService.findByLogin(loginDTO);
        const payload = {
            email: user.email
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
