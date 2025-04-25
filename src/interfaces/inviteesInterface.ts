export interface IInvitee {
  id: string;
  event_id: string;
  user_id?: string;
  status: 'pending' | 'accept' | 'maybe' | 'no' | 'busy';
  qr_code?: string;
  is_checked_in?: boolean;
  checked_in_at?: Date;
  is_checked_out?: boolean;
  checked_out_at?: Date;
  gift_money?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IInviteesRepository {
  findAll(): Promise<IInvitee[]>;
  findByEventId(eventId: string): Promise<IInvitee []>;
  create(invitee: Omit<IInvitee,"id" | "created_at">): Promise<IInvitee>;
  updateStatus(inviteeId: string, status: string): Promise<IInvitee>;
}

export interface IInviteeService {
  // findInvitesByUserId(userId: any): unknown;
  // getUserById(userId: any): unknown;
  getAllInvitees(): Promise<IInvitee[]>;
  getInviteeByEventId(eventId: string): Promise<IInvitee[]>;
  createInvitee(invitee: Omit<IInvitee,"id" | "created_at">): Promise<IInvitee>;
  updateInviteeStatus(inviteeId: string, status:string): Promise<IInvitee>;}
