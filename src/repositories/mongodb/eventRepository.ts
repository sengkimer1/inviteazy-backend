import { EventModel, IEventDocument } from "../mongodb/models/eventModel";
import { IEvent, IEventRepository } from "../../interfaces/eventInterface";

export class MongoEventRepository implements IEventRepository {
  update(id: string, event: IEvent): Promise<IEvent> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<IEvent[]> {
    const events: IEventDocument[] = await EventModel.find();
    return events.map((event) => ({
      id: event.id.toString(),
      user_id: event.user_id.toString(),
      event_name: event.event_name,
      event_datetime: event.event_datetime,
      location: event.location,
      description: event.description,
      created_at: event.createdAt!,
      updated_at: event.updatedAt!,
    }));
  }

  async findById(id: string): Promise<IEvent | null> {
    const event = await EventModel.findById(id).populate("user_id");
    if (!event) return null;

    return {
      id: event.id.toString(),
      user_id: event.user_id.toString(),
      event_name: event.event_name,
      event_datetime: event.event_datetime,
      location: event.location,
      description: event.description,
      created_at: event.createdAt!,
      updated_at: event.updatedAt!,
    };
  }

  async findByUserId(userId: string): Promise<IEvent[]> {
    const events = await EventModel.find({ user_id: userId });
    return events.map((event) => ({
      id: event.id.toString(),
      user_id: event.user_id.toString(),
      event_name: event.event_name,
      event_datetime: event.event_datetime,
      location: event.location,
      description: event.description,
      created_at: event.createdAt!,
      updated_at: event.updatedAt!,
    }));
  }

  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    const newEvent = new EventModel(event);
    const saved = await newEvent.save();
    return {
      id: saved.id.toString(),
      user_id: saved.user_id.toString(),
      event_name: saved.event_name,
      event_datetime: saved.event_datetime,
      location: saved.location,
      description: saved.description,
      created_at: saved.createdAt!,
      updated_at: saved.updatedAt!,
    };
  }

  // async update(eventId: string, updates: Partial<IEvent>): Promise<IEvent | null> {
  //   const updated = await EventModel.findByIdAndUpdate(eventId, updates, { new: true });
  //   if (!updated) return null;

  //   return {
  //     id: updated.id.toString(),
  //     user_id: updated.user_id.toString(),
  //     event_name: updated.event_name,
  //     event_datetime: updated.event_datetime,
  //     location: updated.location,
  //     description: updated.description,
  //     created_at: updated.createdAt!,
  //     updated_at: updated.updatedAt!,
  //   };
  // }
}
