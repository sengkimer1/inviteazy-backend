import mongoose, { Document, Schema } from "mongoose";

export interface IInviteeDocument extends Document {
  event_id: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
  status: 'pending' | 'accept' | 'maybe' | 'no' | 'busy';
  qr_code?: string;
  is_checked_in?: boolean;
  checked_in_at?: Date;
  is_checked_out?: boolean;
  checked_out_at?: Date;
  gift_money?: number;
  createdAt: Date;
  updatedAt: Date;
}

const InviteeSchema = new Schema<IInviteeDocument>(
  {
    event_id: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ['pending', 'accept', 'maybe', 'no', 'busy'], default: 'pending' },
    qr_code: { type: String },
    is_checked_in: { type: Boolean, default: false },
    checked_in_at: { type: Date },
    is_checked_out: { type: Boolean, default: false },
    checked_out_at: { type: Date },
    gift_money: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const InviteeModel = mongoose.model<IInviteeDocument>("Invitee", InviteeSchema);
