import { Pool, QueryResult } from "pg";
import { IInvitee, IInviteesRepository } from "../../interfaces/inviteesInterface";

export class PostgresInviteesRepository implements IInviteesRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IInvitee[]> {
    const { rows } = await this.pool.query<IInvitee>('SELECT * FROM invitees');
    return rows;
  }

  async findById(id: string): Promise<IInvitee | null> {
    const { rows } = await this.pool.query<IInvitee>(
      `SELECT * FROM invitees WHERE id = $1`, [id]
    );
    return rows[0] || null;
  }

  async create(invitee: IInvitee): Promise<IInvitee> {
    const { event_id, user_id} = invitee;
    console.log("===========",invitee)
    const { rows } = await this.pool.query<IInvitee>(
      `INSERT INTO invitees (event_id, user_id, status, qr_code, is_checked_in, checked_in_at, is_checked_out, checked_out_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [event_id, user_id, "pending", "qwert", false, null, false, null]
    );
    
    return rows[0];
  }

  async update(id: string, invitee: IInvitee): Promise<IInvitee> {
    const { event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at, updated_at } = invitee;
    const { rows } = await this.pool.query<IInvitee>(
      `UPDATE invitees SET event_id = $1, user_id = $2, status = $3, qr_code = $4, is_checked_in = $5, checked_in_at = $6, created_at = $7, updated_at = $8 
      WHERE id = $9
      RETURNING *`,
      [event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at, updated_at, id]
    );
    return rows[0] || null;
  }
}
