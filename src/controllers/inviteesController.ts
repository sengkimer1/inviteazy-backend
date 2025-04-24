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
  async getInviteeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const invitee = await this.inviteeService.getInviteeById(id);
      if (invitee) {
        res.status(200).json(invitee);
      } else {
        res.status(404).json({ message: `Invitee with ID ${id} not found.` });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching the invitee." });
    }
  }

 

  // Update an existing invitee by ID
  async updateInvitee(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedInvitee: Partial<IInvitee> = req.body;

    try {
      const invitee = await this.inviteeService.updateInvitee(id, updatedInvitee);
      if (invitee) {
        res.status(200).json(invitee);
      } else {
        res.status(404).json({ message: `Invitee with ID ${id} not found for update.` });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the invitee." });
    }
  }
}
