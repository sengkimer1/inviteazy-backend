import { InviteeModel, IInviteeDocument } from "../mongodb/models/inviteModel";
import { IInvitee, IInviteesRepository } from "../../interfaces/inviteesInterface";

export class MongoInviteesRepository implements IInviteesRepository {
  
  async findAll(): Promise<IInvitee[]> {
    const invitees: IInviteeDocument[] = await InviteeModel.find();
    return invitees.map(this.mapInviteeDocumentToInvitee);
  }

  async findById(id: string): Promise<IInvitee | null> {
    const invitee = await InviteeModel.findById(id);
    if (!invitee) return null;
    return this.mapInviteeDocumentToInvitee(invitee);
  }

  async findByEventId(eventId: string): Promise<IInvitee[]> {
    const invitees = await InviteeModel.find({ event_id: eventId });
    return invitees.map(this.mapInviteeDocumentToInvitee);
  }

  async create(invitee: Omit<IInvitee, "id" | "created_at" | "updated_at">): Promise<IInvitee> {
    const newInvitee = new InviteeModel(invitee);
    const saved = await newInvitee.save();
    return this.mapInviteeDocumentToInvitee(saved);
  }

  async updateStatus(inviteeId: string, status: 'pending' | 'accept' | 'maybe' | 'no' | 'busy'): Promise<IInvitee> {
    const updated = await InviteeModel.findByIdAndUpdate(
      inviteeId,
      { status },
      { new: true }
    );
    if (!updated) throw new Error("Invitee not found");
    return this.mapInviteeDocumentToInvitee(updated);
  }

  async updataCheckInStatus(inviteeId: string, is_checked_in: boolean): Promise<IInvitee> {
    const updated = await InviteeModel.findByIdAndUpdate(
      inviteeId,
      { 
        is_checked_in,
        checked_in_at: is_checked_in ? new Date() : undefined 
      },
      { new: true }
    );
    if (!updated) throw new Error("Invitee not found");
    return this.mapInviteeDocumentToInvitee(updated);
  }

  async updateCheckOutStatus(inviteeId: string, is_checked_out: boolean): Promise<IInvitee> {
    const updated = await InviteeModel.findByIdAndUpdate(
      inviteeId,
      { 
        is_checked_out,
        checked_out_at: is_checked_out ? new Date() : undefined 
      },
      { new: true }
    );
    if (!updated) throw new Error("Invitee not found");
    return this.mapInviteeDocumentToInvitee(updated);
  }

  private mapInviteeDocumentToInvitee(doc: IInviteeDocument): IInvitee {
    return {
      id: doc.id.toString(),
      event_id: doc.event_id.toString(),
      user_id: doc.user_id?.toString(),
      status: doc.status,
      qr_code: doc.qr_code,
      is_checked_in: doc.is_checked_in,
      checked_in_at: doc.checked_in_at,
      is_checked_out: doc.is_checked_out,
      checked_out_at: doc.checked_out_at,
      gift_money: doc.gift_money,
      created_at: doc.createdAt,
      updated_at: doc.updatedAt,
    };
  }
}
