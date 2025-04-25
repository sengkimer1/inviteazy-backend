// import { Router } from "express";
// import { EventController } from "../controllers/eventController";
// import { authMiddleware } from "../middlewares/authMiddleware";

// import { validateEvent,validateIdInEvent } from "../middlewares/validationEvent";
// export default function eventRoutes(controller: EventController): Router {
//   const router = Router();

//   router.get( "/all", authMiddleware, controller.getAllEvents.bind(controller) );

//   // router.get(
//   //   "/:id",
//   //   authMiddleware,
//   //   validateIdInEvent,
//   //   controller.getEventById.bind(controller)
//   // );
//   // Route to create a new event
//   router.post("/",  authMiddleware,validateEvent,controller.createEvent.bind(controller));
//   router.post("/:eventId/invite",authMiddleware,controller.inviteUserToEvent.bind(controller));
//   return router;
// }
import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateEvent } from "../middlewares/validationEvent";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.get("/all", authMiddleware, controller.getAllEvents.bind(controller));
  router.get("/:id",authMiddleware,controller.getEventById.bind(controller));

  router.post("/", authMiddleware, validateEvent, controller.createEvent.bind(controller));

  router.post("/:eventId/invite", authMiddleware, controller.inviteUserToEvent.bind(controller));
  router.get("/:event_id/status",controller.getGuestInsights.bind(controller));

  return router;
}
