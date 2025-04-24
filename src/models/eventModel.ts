import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
    user_id: mongoose.Types.ObjectId; // reference to user
    event_name?: string;
    event_datetime?: Date;
    location?: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}

const EventSchema: Schema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, },
        event_name: { type: String, },
        event_datetime: { type: Date, },
        location: { type: String, },
        description: { type: String },
     
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IEvent>("Event", EventSchema);
