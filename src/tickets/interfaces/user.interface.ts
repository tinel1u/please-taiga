import { Document } from "mongoose";
import { Role } from "../auth/roles/role.enum";

export interface User extends Document {
    readonly login: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
}
