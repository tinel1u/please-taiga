import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";
import { User } from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";
import { Payload } from "../interfaces/payload.interface";

@Injectable()
export class UserService {
    // eslint-disable-next-line no-unused-vars
    constructor(@InjectModel("User") private userModel: Model<User>) {}

    async create(registerDTO: RegisterDTO) {
        const { email } = registerDTO;
        const user = await this.userModel.findOne({ email });

        if (user) {
            throw new HttpException(
                "user already exists",
                HttpStatus.BAD_REQUEST
            );
        }

        const salt = await bcrypt.genSalt(10);
        registerDTO.password = await bcrypt.hash(registerDTO.password, salt);
        const createdUser = new this.userModel(registerDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async findByLogin(userDTO: LoginDTO) {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException(
                "User doesn't exists",
                HttpStatus.BAD_REQUEST
            );
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException(
                "Invalid credentials",
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async findByPayload(payload: Payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }

    async findByUsername(username: string) {
        return await this.userModel.findOne({ username });
    }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized["password"];
        return sanitized;
    }
}
