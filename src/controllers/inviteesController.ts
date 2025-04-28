import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { IInvitee, IInviteeService } from "../interfaces/inviteesInterface";
import { IUserService } from "../interfaces/userInterface";
import redisCache from "../services/cacheService";

interface AuthRequest extends Request {
  userId: string; // Assuming userId is always provided via middleware
}

export class InviteeController {
  private inviteeService: IInviteeService;
  // private userService: IUserService;

  constructor(inviteeService: IInviteeService) {
    this.inviteeService = inviteeService;
    
  }
  
  // Get all invitees
  async getAllInvitees(req: Request, res: Response): Promise<void> {
    try {
      const invitees = await this.inviteeService.getAllInvitees();
      res.status(200).json(invitees);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching invitees." });
    }
  }

  // Get invitee by ID
  // async getInviteeByEventId(req: Request, res: Response,next:NextFunction): Promise<void> {
 
  //   try {
  //     const {eventId}= req.params;
  //     const result = await this.inviteeService.getInviteeByEventId(eventId);

  //    res.json({message:"Invitees retrieved by even ID.",data:result})
  //   } catch (error) {
  //     res.status(500).json({ message: "An error occurred while fetching the invitee." });
  //   }
  // }
  async getInviteeByEventId(req: Request, res: Response): Promise<void> {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);
  
      if (cacheData) {
        res.json({
          message: "Cache: Invitees retrieved by event ID",
          data: JSON.parse(cacheData),
        });
        return;
      }
  
      const { eventId } = req.params;
      const result = await this.inviteeService.getInviteeByEventId(eventId);
      await redisCache.set(cacheKey, JSON.stringify(result), 360);
  
      res.json({ message: "API: Invitees retrieved by event ID", data: result });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching the invitees." });
    }
  }
  
  

  // Update an existing invitee by ID
  async updateInviteeStaus(req: Request, res: Response,next:NextFunction) {
    try {
      const {inviteId}  = req.params;
      const { status } = req.body;

      console.log(inviteId,"=================================");
      

      // const validStatuses = [ "accept","maybe","No","Busy"];
      // if (!validStatuses.includes(status)) {
      // res.status(400).json({message: " Invaild status value"});
      // return;
      // }
      const updated = await this.inviteeService.updateInviteeStatus(inviteId,status);
      res.status(200).json({message: "invitee status updated.",data: updated})
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the invitee." });
      next(error);
    }
  }

  // async updateCheckInStatus(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { inviteId } = req.params;
  //     const updatedInvitee = await this.inviteeService.updataCheckInStatus(inviteId);
  //     res.status(200).json({ message: "Check-in status updated.", data: updatedInvitee });
  //   } catch (error) {
  //     res.status(500).json({ message: "An error occurred while updating the check-in status." });
  //     next(error);
  //   }
  // }
  async updateCheckInStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { inviteId } = req.params;
  
      const invitee = await this.inviteeService.findById(inviteId);
  
      if (!invitee) {
        res.status(404).json({ message: "Invitee not found." });
        return;
      }
  
      const newCheckInStatus = !invitee.is_checked_in;
  
      const updatedInvitee = await this.inviteeService.updataCheckInStatus(inviteId, newCheckInStatus);
  
      res.status(200).json({
        message: `Check-in status updated to ${newCheckInStatus}`,
        data: updatedInvitee,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCheckOutStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const {inviteId} = req.params;
      const invitee = await this.inviteeService.findById(inviteId);
      if (!invitee) {
        res.status(404).json({ message: "Invitee not found." });
        return;
      }
      const newCheckOutStatus = !invitee.is_checked_out;
      const updatedInvitee = await this.inviteeService.updateCheckOutStatus(inviteId, newCheckOutStatus);
      res.status(200).json({
        message: `Check-out status updated to ${newCheckOutStatus}`,
        data: updatedInvitee,
      });
    } catch (error) {
      next(error);
    }
  }
}
