import { Router } from "express";
import { InviteeController } from "../controllers/inviteesController";
import { authMiddleware } from "../middlewares/authMiddleware";

// import { validateInvitees,validateIdInInvitees } from "../middlewares/validationInvitees";
export default function inviteeRoutes(controller: InviteeController): Router {
  const router = Router();

  router.get( "/all", authMiddleware, controller.getAllInvitees.bind(controller) );

  router.get(
    "/event/:eventid",
    authMiddleware,
    controller.getInviteeByEventId.bind(controller)
  );

  // Route to update an event
  router.patch("/:inviteId",authMiddleware,controller.updateInviteeStaus.bind(controller));

  return router;
}
