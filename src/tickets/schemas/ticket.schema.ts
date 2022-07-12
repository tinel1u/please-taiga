import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const TicketSchema = new Schema({
    id: String,
    title: String,
    reference: String,
    content: String,
    creator: String,
    status: {
        type: String,
        enum: ["new", "in progress", "ready for test", "closed", "needs info"],
    },
});