import { InviteeModel, IInviteeDocument } from "../mongodb/models/inviteModel";
import { IInvitee, IInviteesRepository } from "../../interfaces/inviteesInterface";

export class MongoInviteesRepository implements IInviteesRepository {
  async findAll(): Promise<IInvitee[]> {
    const invitees: IInviteeDocument[] = await InviteeModel.find();
    return invitees.map((invitee) => ({
      id: invitee.id.toString(),
      event_id: invitee.event_id.toString(),
      user_id: invitee.user_id?.toString(),
      status: invitee.status,
      qr_code: invitee.qr_code,
      is_checked_in: invitee.is_checked_in,
      checked_in_at: invitee.checked_in_at || undefined,
      is_checked_out: invitee.is_checked_out,
      checked_out_at: invitee.checked_out_at || undefined,
      gift_money: invitee.gift_money,
      created_at: invitee.createdAt,
      updated_at: invitee.updatedAt,
    }));
  }

  async findById(id: string): Promise<IInvitee | null> {
    const invitee = await InviteeModel.findById(id);
    if (!invitee) return null;

    return {
      id: invitee.id.toString(),
      event_id: invitee.event_id.toString(),
      user_id: invitee.user_id?.toString(),
      status: invitee.status,
      qr_code: invitee.qr_code,
      is_checked_in: invitee.is_checked_in,
      checked_in_at: invitee.checked_in_at || undefined,
      is_checked_out: invitee.is_checked_out,
      checked_out_at: invitee.checked_out_at || undefined,
      gift_money: invitee.gift_money,
      created_at: invitee.createdAt,
      updated_at: invitee.updatedAt,
    };
  }

  async create(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee> {
    const newInvitee = new InviteeModel(invitee);
    const saved = await newInvitee.save();

    return {
      id: saved.id.toString(),
      event_id: saved.event_id.toString(),
      user_id: saved.user_id?.toString(),
      status: saved.status,
      qr_code: saved.qr_code,
      is_checked_in: saved.is_checked_in,
      checked_in_at: saved.checked_in_at || undefined,
      is_checked_out: saved.is_checked_out,
      checked_out_at: saved.checked_out_at || undefined,
      gift_money: saved.gift_money,
      created_at: saved.createdAt,
      updated_at: saved.updatedAt,
    };
  }

  async update(id: string, invitee: Partial<IInvitee>): Promise<IInvitee> {
    const updated = await InviteeModel.findByIdAndUpdate(id, invitee, { new: true });
    if (!updated) throw new Error("Invitee not found");

    return {
      id: updated.id.toString(),
      event_id: updated.event_id.toString(),
      user_id: updated.user_id?.toString(),
      status: updated.status,
      qr_code: updated.qr_code,
      is_checked_in: updated.is_checked_in,
      checked_in_at: updated.checked_in_at || undefined,
      is_checked_out: updated.is_checked_out,
      checked_out_at: updated.checked_out_at || undefined,
      gift_money: updated.gift_money,
      created_at: updated.createdAt,
      updated_at: updated.updatedAt,
    };
  }
}
