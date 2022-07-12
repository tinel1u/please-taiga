import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/tickets/user/user.service";
import { ROLES_KEY } from "./role.decorator";
import { Role } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    // eslint-disable-next-line no-unused-vars
    constructor(
        // eslint-disable-next-line no-unused-vars
        private reflector: Reflector,
        // eslint-disable-next-line no-unused-vars
        private userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
