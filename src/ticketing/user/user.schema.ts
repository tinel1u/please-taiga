import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    login: { type: String, required: true },
    roles: [
        {
            type: String
        }
    ]
});
