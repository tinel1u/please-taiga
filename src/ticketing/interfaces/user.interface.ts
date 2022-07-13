import { Document } from "mongoose";
import { RoleEnum } from "../enums/role.enum";

export interface User extends Document {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: RoleEnum[];
}
