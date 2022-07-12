import { Document } from "mongoose";

export interface Ticket extends Document {
    readonly id: string;
    readonly title: string;
    readonly reference: string;
    readonly content: string;
    readonly creator: string;
    readonly status: string;
}