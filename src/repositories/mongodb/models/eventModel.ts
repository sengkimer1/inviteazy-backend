import mongoose, { Schema, Document } from "mongoose";

export interface IEventDocument extends Document {
    user_id: mongoose.Types.ObjectId;
    event_name: string;
    event_datetime: Date;
    location: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const EventSchema: Schema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, },
        event_name: { type: String, },
        event_datetime: { type: Date, },
        location: { type: String, },
        description: { type: String },
    },
    { timestamps: true, }
);

export const EventModel =  mongoose.model<IEventDocument>("Event", EventSchema);
