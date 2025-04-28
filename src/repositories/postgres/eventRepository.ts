import { Pool } from "pg";
import { IEvent, IEventRepository } from "../../interfaces/eventInterface";
import { queryWithLogging } from "./utils";  // Import the queryWithLogging function

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      'SELECT * FROM events', 
      []
    );
    return rows;
  }

  async findById(id: string): Promise<IEvent | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      'SELECT * FROM events WHERE id = $1',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async create(event: IEvent): Promise<IEvent> {
    const { id, user_id, event_name, event_datetime, location, description, created_at, updated_at } = event;
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO events (id, user_id, event_name, event_datetime, location, description, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [id, user_id, event_name, event_datetime, location, description, created_at, updated_at]
    );
    return rows[0];
  }

  async update(id: string, event: IEvent): Promise<IEvent> {
    const { user_id, event_name, event_datetime, location, description, updated_at } = event;
    const { rows } = await queryWithLogging(
      this.pool,
      `UPDATE events SET user_id = $1, event_name = $2, event_datetime = $3, location = $4, description = $5, updated_at = $6
      WHERE id = $7 RETURNING *`,
      [user_id, event_name, event_datetime, location, description, updated_at, id]
    );
    return rows[0];
  }
}
