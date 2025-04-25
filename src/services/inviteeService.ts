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

}
