import { Pool, QueryResult } from "pg";
import { IInvitee, IInviteesRepository } from "../../interfaces/inviteesInterface";
import { queryWithLogging } from "./utils";


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
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT * FROM invitees WHERE id = $1`, 
      [id]
    );
    return rows[0]|| null; 
  }
  async findByEventId(eventId: string): Promise<IInvitee[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT * FROM invitees WHERE event_id = $1`, 
      [eventId]
    );
    return rows; 
  }
  async create(invitee: IInvitee): Promise<IInvitee> {
    const { event_id, user_id } = invitee;
    const { rows } = await this.pool.query<IInvitee>(
      `INSERT INTO invitees (event_id, user_id, status, qr_code, is_checked_in, checked_in_at, is_checked_out, checked_out_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [event_id, user_id, "pending", "qwert", false, null, false, null]
    );

    return rows[0];
  }

  // async updateStutes(id: string, invitee: IInvitee): Promise<IInvitee> {
  //   const { event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at, updated_at } = invitee;
  //   const { rows } = await this.pool.query<IInvitee>(
  //     `UPDATE invitees SET event_id = $1, user_id = $2, status = $3, qr_code = $4, is_checked_in = $5, checked_in_at = $6, created_at = $7, updated_at = $8 
  //     WHERE id = $9
  //     RETURNING *`,
  //     [event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at, updated_at, id]
  //   );
  //   return rows[0] || null;
  // }
  async updateStatus(inviteeId: string, status: string): Promise<IInvitee> {
    console.log("-------------------", status);

    const { rows } = await queryWithLogging(
      this.pool,
      ` UPDATE invitees
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;`,
      [status, inviteeId]
    );
    return rows[0];
  }

  async updataCheckInStatus(inviteeId: string, is_checked_in: boolean): Promise<IInvitee> {
    return queryWithLogging(
      this.pool,
      `UPDATE invitees 
       SET is_checked_in = $1, 
           checked_in_at = CASE WHEN $1 THEN NOW() ELSE NULL END
       WHERE id = $2 
       RETURNING *`,
      [is_checked_in, inviteeId]
    ).then((result) => result.rows[0]);
  }
  
  
  async updateCheckOutStatus(inviteeId: string, is_checked_out: boolean): Promise<IInvitee> {
    return queryWithLogging(
      this.pool,
      `UPDATE invitees 
       SET is_checked_out = $1, 
           checked_out_at = CASE WHEN $1 THEN NOW() ELSE NULL END
       WHERE id = $2 
       RETURNING *`,
      [is_checked_out, inviteeId]
    ).then((result) => result.rows[0]);
  }
}
