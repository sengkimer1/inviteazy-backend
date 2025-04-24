export interface IEvent {
    id: string;
    user_id?: string;
    event_name: string;
    event_datetime: Date;
    location: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface IEventRepository {
    findAll(): Promise<IEvent[]>;
    findById(id: string): Promise<IEvent | null>;
    create(event: IEvent): Promise<IEvent>;
    update(id: string, event: IEvent): Promise<IEvent>;
  }
  export interface IEventService {
    getAllEvents(): Promise<IEvent[]>;
    getEventById(id: string): Promise<IEvent | null>;
    createEvent(event: IEvent): Promise<IEvent>;
    updateEvent(id: string, event: IEvent): Promise<IEvent>;
  }
    