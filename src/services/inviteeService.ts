import { invalid } from "joi";
import { IInvitee, IInviteeService, IInviteesRepository } from "../interfaces/inviteesInterface";

export class InviteeService implements IInviteeService {
  private inviteesRepository: IInviteesRepository;

  constructor(inviteesRepository: IInviteesRepository) {
    this.inviteesRepository = inviteesRepository;
  }

  async createInvitee(invitee: Omit<IInvitee, "id" >): Promise<IInvitee> {
    return await this.inviteesRepository.create(invitee);
  }

  async getAllInvitees(): Promise<IInvitee[]> {
    return await this.inviteesRepository.findAll();
  }

  async getInviteeByEventId(eventId: string): Promise<IInvitee[]> {
    return await this.inviteesRepository.findByEventId(eventId);
  }

  async updateInviteeStatus(inviteeId: string, status:string): Promise<IInvitee> {
    return await this.inviteesRepository.updateStatus(inviteeId, status);
  }
  async updataCheckInStatus(inviteeId: string, is_checked_in:boolean): Promise<IInvitee> {
    return await this.inviteesRepository.updataCheckInStatus(inviteeId, is_checked_in);
  }
  async updateCheckOutStatus(inviteeId: string, is_checked_out:boolean): Promise<IInvitee> {
    return await this.inviteesRepository.updateCheckOutStatus(inviteeId, is_checked_out);
  }
  async findById(id: string): Promise<IInvitee | null> {
    return await this.inviteesRepository.findById(id);
  }

}
