import { Router } from "express";
import { InviteeController } from "../controllers/inviteesController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function inviteeRoutes(controller: InviteeController): Router {
  const router = Router();

  router.get( "/all", authMiddleware, controller.getAllInvitees.bind(controller) );

  router.get("/event/:eventid",authMiddleware,controller.getInviteeByEventId.bind(controller));

  // Route to update an event
  router.patch("/:inviteId",authMiddleware,controller.updateInviteeStaus.bind(controller));

  //check in
  router.patch("/checkin/:inviteId",authMiddleware,controller.updateCheckInStatus.bind(controller));
  router.patch("/checkout/:inviteId",authMiddleware,controller.updateCheckOutStatus.bind(controller));
  // router.get("/:id",authMiddleware,controller.getInviteeById.bind(controller));
  // router.put("/:id",authMiddleware,controller.updateInvitee.bind(controller));

  return router;
}
