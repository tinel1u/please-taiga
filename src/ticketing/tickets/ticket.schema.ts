import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const TicketSchema = new Schema({
    id: { type: String, unique: true },
    title: { type: String, unique: false, required: false },
    reference: { type: String, unique: true, required: true },
    content: { type: String, unique: false, required: false },
    creator: { type: String, unique: false, required: true },
    status: {
        type: String,
        enum: ["new", "in progress", "ready for test", "closed", "needs info"]
    }
});
