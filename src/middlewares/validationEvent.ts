import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// UUID validation pattern (RFC4122)
const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

// Zod Schema for Event
const eventSchema = z.object({
  event_name: z.string().optional(),
  event_datetime: z.coerce.date().optional(), // Accepts ISO or Date
  location: z.string().optional(),
  description: z.string().optional(),
});

// Middleware to validate UUID in the event
export const validateIdInEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { user_id } = req.body;

  // Check if user_id is a valid UUID
  if (!user_id || !uuidPattern.test(user_id)) {
     res.status(400).json({
      message: "Invalid user_id. Must be a valid UUID",
    });
  }

  next();
};

// Middleware to validate Event Object using Zod schema
export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    eventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }
    next(error);
  }
};
