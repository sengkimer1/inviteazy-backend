import { Request, Response, NextFunction } from "express";
import { IUserService } from "../interfaces/userInterface";
import redisCache from "../services/cacheService";

export class UserController {
  constructor(private userService: IUserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ message: "Get all users.", data: users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);

      if (cacheData) {
        res.json({
          message: "Cache: Get user by Id",
          data: JSON.parse(cacheData),
        });
        return;
      }

      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      await redisCache.set(cacheKey, JSON.stringify(user), 360);

      res.json({ message: "Api: Get user by Id", data: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        password,
        role,
        full_name,
        phone_number,
        profile_picture,
        address,
      } = req.body;
      const result = await this.userService.createUser({
        email,
        password,
        role,
        full_name,
        phone_number,
        profile_picture,
        address,
      });

      res.status(201).json({ message: "A new user was created.", data: result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
