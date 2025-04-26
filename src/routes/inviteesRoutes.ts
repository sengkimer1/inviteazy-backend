import { Router } from "express";
import { InviteeController } from "../controllers/inviteesController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function inviteeRoutes(controller: InviteeController): Router {
  const router = Router();

  router.get( "/all", authMiddleware, controller.getAllInvitees.bind(controller) );

  router.get("/:id",authMiddleware,controller.getInviteeById.bind(controller));
  router.put("/:id",authMiddleware,controller.updateInvitee.bind(controller));

  return router;
}
