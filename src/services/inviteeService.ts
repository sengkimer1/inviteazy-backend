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

  async getInviteeById(id: string): Promise<IInvitee | null> {
    return await this.inviteesRepository.findById(id);
  }

  async updateInvitee(id: string, updates: Partial<IInvitee>): Promise<IInvitee | null> {
    return await this.inviteesRepository.update(id, updates);
  }

}
