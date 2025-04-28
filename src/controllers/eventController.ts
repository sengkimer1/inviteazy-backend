import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { IEvent, IEventService } from "../interfaces/eventInterface";
import { IInviteeService } from "../interfaces/inviteesInterface";
import redisCache from "../services/cacheService";

interface AuthentciatedRequest extends Request {
  user?: { id: string };
}

export class EventController {
  constructor(
    private eventService: IEventService,
    private inviteeService: IInviteeService
  ) {}

  async getAllEvents(req: Request, res: Response): Promise<void> {
    const cacheKey = `data:${req.method}:${req.originalUrl}`;

    try {
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        res.status(200).json({
          message: "Cache: All events retrieved.",
          data: JSON.parse(cachedData),
        });
        return;
      }

      const events = await this.eventService.getAllEvents();
      await redisCache.set(cacheKey, JSON.stringify(events), 360);

      res.status(200).json({
        message: "API: All events retrieved.",
        data: events,
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching events." });
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const cacheKey = `data:${req.method}:${req.originalUrl}`;

    try {
      const cacheData = await redisCache.get(cacheKey);
      if (cacheData) {
        res.status(200).json({
          message: `Cache: Event with ID ${id} retrieved.`,
          data: JSON.parse(cacheData),
        });
        return;
      }

      const event = await this.eventService.getEventById(id);
      if (event) {
        await redisCache.set(cacheKey, JSON.stringify(event), 360);
        res.status(200).json({
          message: `API: Event with ID ${id} retrieved.`,
          data: event,
        });
      } else {
        res.status(404).json({ message: `Event with ID ${id} not found.` });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching the event." });
    }
  }

  async createEvent(req: AuthentciatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user?.id;

      const {
        event_name,
        event_datetime,
        location,
        description
      }: IEvent = req.body;

      const newEvent = await this.eventService.createEvent({
        id: uuidv4(), // generate UUID for the event ID
        user_id: user,
        event_name,
        event_datetime,
        location,
        description,
        created_at: new Date(),
        updated_at: new Date(),
      });

      res.status(201).json({ message: "A new event was created.", data: newEvent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while creating the event." });
    }
  }

  async inviteUserToEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;
      const { user_id } = req.body;

      const newInvitee = await this.inviteeService.createInvitee({
        event_id: eventId,
        user_id,
        status: "pending",
      });

      res.status(201).json({ message: "User invited to the event successfully.", data: newInvitee });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while inviting the user to the event." });
      console.error(error);
      next(error);
    }
  }

  async getGuestInsights(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event_id = req.params.event_id;
      const insights = await this.inviteeService.getInviteeByEventId(event_id);

      const statusCounts = {
        totalInvited: insights.length,
        accept: 0,
        pending: 0,
        no: 0,
        busy: 0,
        maybe: 0,
        attended: 0,
        totalContribution: 0,
        totalGiftMoney: 0,
      };

      for (const invite of insights) {
        const status = invite.status;
        if (status in statusCounts) {
          statusCounts[status as keyof typeof statusCounts]++;
        }
        if (invite.is_checked_in) {
          statusCounts.attended++;
        }
        if (invite.gift_money) {
          statusCounts.totalGiftMoney += Number(invite.gift_money);
        }
      }

      res.status(200).json({ data: statusCounts });
    } catch (error) {
      console.log("Error fetching guest insights:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
