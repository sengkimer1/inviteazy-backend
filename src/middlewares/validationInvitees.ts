// import { Request, Response, NextFunction } from "express";
// import { z, ZodError } from "zod";
// import { PostgresInviteesRepository } from "../repositories/postgres/inviteesRepository";
// import { IInvitee } from "../interfaces/inviteesInterface";

// const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

// // Zod Schema for Event
// const eventSchema = z.object({
//   event_id: z.string().regex(uuidPattern, "Invalid UUID format for event_id"),
//   user_id: z.string().regex(uuidPattern, "Invalid UUID format for user_id"),
//   event_name: z.string().optional(),
//   event_datetime: z.coerce.date().optional(),
//   location: z.string().optional(),
//   description: z.string().optional(),
// });

// // Middleware to validate UUID in the invitee (user_id)
// export const validateIdInInvitees = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const { user_id } = req.body;

//   if (!user_id || !uuidPattern.test(user_id)) {
//      res.status(400).json({
//       message: "Invalid user_id. Must be a valid UUID",
//     });
//   }

//   next();
// };

// // Middleware to validate Event Object using Zod schema
// export const validateInvitees = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   try {
//     eventSchema.parse(req.body);
//     next();
//   } catch (error) {
//     if (error instanceof ZodError) {
//        res.status(400).json({
//         message: "Validation error",
//         errors: error.errors.map((err) => ({
//           path: err.path.join("."),
//           message: err.message,
//         })),
//       });
//     }
//     next(error);
//   }
// };

// // Example route where you use the middleware before repository methods
// export const createInvitee = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     // Validate body first
//     const invitee: IInvitee = req.body;

//     // Initialize repository
//     const repository = new PostgresInviteesRepository(req.app.locals.dbPool);

//     // Call create method on repository
//     const newInvitee = await repository.create(invitee);
//     res.status(201).json(newInvitee);
//   } catch (error) {
//     next(error);
//   }
// };
