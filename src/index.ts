import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { EventController } from "./controllers/eventController";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import {  PostgresInviteesRepository } from "./repositories/postgres/inviteesRepository"
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { MongoUserRepository } from "./repositories/mongodb/userRepository";
import { connectMongoDB } from "./config/mongodb/db";
import { EventService } from "./services/eventService";
import { PostgresEventRepository } from "./repositories/postgres/eventRepository";
import { InviteeService } from "./services/inviteeService";
import { InviteeController } from "./controllers/inviteesController";
import inviteeRoutes from "./routes/inviteesRoutes";

dotenv.config();

const app = express();
const port = 3000;

// Switch connection to database
// connectMongoDB();
const pgPool = connectPostgresDb();

// Repositories
const userRepository = new PostgresUserRepository(pgPool);
const eventRepository = new PostgresEventRepository(pgPool);
const inviteeRepository = new PostgresInviteesRepository(pgPool);


// Services
const userService = new UserService(userRepository);
const eventService = new EventService(eventRepository);
const inviteeService = new InviteeService(inviteeRepository);


// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);
const eventController = new EventController(eventService,inviteeService); 
const inviteeController = new InviteeController(inviteeService);

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/v1/events", eventRoutes(eventController)); 
app.use("/api/v1/invitees", inviteeRoutes(inviteeController));

// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
