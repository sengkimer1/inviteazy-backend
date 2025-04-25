import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { IInvitee, IInviteeService } from "../interfaces/inviteesInterface";
import { IUserService } from "../interfaces/userInterface";

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
  async getInviteeByEventId(req: Request, res: Response,next:NextFunction): Promise<void> {
 
    try {
      const {eventId}= req.params;
      const result = await this.inviteeService.getInviteeByEventId(eventId);

     res.json({message:"Invitees retrieved by even ID.",data:result})
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching the invitee." });
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
}
