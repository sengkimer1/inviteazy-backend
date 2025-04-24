import { IEvent, IEventService, IEventRepository } from "../interfaces/eventInterface";

export class EventService implements IEventService {
  private eventRepository: IEventRepository;

  constructor(eventRepository: IEventRepository) {
    this.eventRepository = eventRepository;
  }

  async getAllEvents(): Promise<IEvent[]> {
    return await this.eventRepository.findAll();
  }

  async getEventById(id: string): Promise<IEvent | null> {
    return await this.eventRepository.findById(id);
  }

  async createEvent(event: IEvent): Promise<IEvent> {
    // Add any additional logic if needed before creating the event
    return await this.eventRepository.create(event);
  }

  async updateEvent(id: string, event: IEvent): Promise<IEvent> {
    // Add any additional logic if needed before updating the event
    return await this.eventRepository.update(id, event);
  }
}
